import React from 'react'

import FloorRequest from '../types/FloorRequest'

import calculateOffset from '../utils/calculate-offset'
import calculateRoute from '../utils/calculate-route'
import lerp from '../utils/lerp'

type ElevatorContextType = {
  requestElevator: Function,
  addFloorToQueue: Function,
  execute: Function,
  direction: string,
  currentFloor: number,
  yOffset: number,
  duration: number,
  queue: Array<FloorRequest>
}

const ElevatorContext = React.createContext<ElevatorContextType>({
  requestElevator: () => {},
  addFloorToQueue: () => {},
  execute: () => {},
  direction: 'up',
  currentFloor: 0,
  yOffset: 0,
  duration: 1000,
  queue: []
})

let movementTimeout : ReturnType<typeof setTimeout>
let waitTimeout: ReturnType<typeof setTimeout>


const logRoute = (route: Array<FloorRequest>) => {
  console.log(
    [...route].map(n => n.floor).join(' -> ')
  )
}
// let current = 0
// let delta = 1

export const ElevatorProvider : React.FC = ({ children }) => {
  const [yOffset, setYOffset] = React.useState(0)
  const [queue, setQueue] = React.useState([])
  const [currentFloor, setCurrentFloor] = React.useState(0)
  const [targetFloor, setTargetFloor] = React.useState(0)
  const [duration, setDuration] = React.useState(1000)
  const [direction, setDirection] = React.useState('up')

  const currentFloorRef: { current: number | null } = React.useRef()
  const targetFloorRef: { current: number | null } = React.useRef()
  const queueRef: { current: Array<FloorRequest> | null } = React.useRef()
  const yOffsetRef: { current: number | null } = React.useRef()
  
  currentFloorRef.current = currentFloor
  targetFloorRef.current = targetFloor
  queueRef.current = queue
  yOffsetRef.current = yOffset

  const addFloorToQueue = (floor: number) => {
    const newQueue = [...queue]
    if (newQueue.indexOf(floor) === -1) {
      newQueue.push({ floor, direction: null })
    }
    setQueue(calculateRoute(newQueue, currentFloor))
  }

  const requestElevator = (floor: number, _direction: string) => {
    stop()

    // If the current direction of the elevator does not match the
    // direction of the requested floor then we do not make a stop
    // there until the elevator is going into the correct direction.
    if (direction !== _direction) {
      const newQueue = [...queue]
      if (newQueue.indexOf(floor) === -1) {
        newQueue.push({ floor, direction: _direction })
      }
      setQueue(newQueue)
      step(newQueue)
      return
    }

    // The direction of the requested floor matches the current
    // direction of the elevator so we can add a stop to our route.
    const newQueue = [...queue]
    if (newQueue.indexOf(floor) === -1) {
      newQueue.push({ floor, direction: _direction })
    }
    setQueue(calculateRoute(newQueue, currentFloor))

    const _duration = Math.abs(currentFloorRef.current - floor) * 1000
    setTargetFloor(floor)
    setDuration(_duration)
    movementTimeout = setTimeout(() => {
      setCurrentFloor(floor)

      if (queueRef.current.length > 0) {
        waitTimeout = setTimeout(() => {
          step(queue)
        }, 3000)
      }
    }, _duration)
  }

  const stop = () => {
    clearTimeout(movementTimeout)
    clearTimeout(waitTimeout)
  }

  const execute = () => {
    step(queueRef.current)
  }

  const step = (_queue: Array<FloorRequest>) => {
    // Get the target floor from the queue and remove it.
    const newQueue = [..._queue]
    const { floor } = newQueue.shift()
    
    // Calculate new duration.
    const _duration = Math.abs(currentFloorRef.current - floor) * 1000
    setDuration(_duration)

    // Update direction.
    setDirection(floor > currentFloorRef.current ? 'up' : 'down')
    
    // Update the target floor.
    setTargetFloor(floor)
    
    movementTimeout = setTimeout(() => {
      // Update the current floor.
      setCurrentFloor(floor)

      // Apply new queue data. This happens after movementTimeout because
      // the button will then deactivate after floor has been reached.
      setQueue(newQueue)

      // If there are more floor requests in the queue we continue the loop.
      if (newQueue.length > 0) {
        waitTimeout = setTimeout(() => {
          step(newQueue)
        }, 3000)
      }
    }, _duration)
  }

  const context = {
    currentFloor,
    targetFloor,
    addFloorToQueue,
    queue,
    calculateOffset,
    duration,
    direction,
    execute,
    requestElevator,
    yOffset
  }

  const render = (now: DOMHighResTimeStamp) => {
    // current += delta;
    // let t = current / 1000
    // const currentOffset = calculateOffset(currentFloorRef.current)
    const targetOffset = calculateOffset(targetFloorRef.current)
    setYOffset(targetOffset)
    window.requestAnimationFrame(render)
  }

  React.useEffect(() => {
    window.requestAnimationFrame(render)
  }, [])

  return <ElevatorContext.Provider value={context}>
    {children}
  </ElevatorContext.Provider>
}

export default ElevatorContext