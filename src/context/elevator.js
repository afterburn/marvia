import React from 'react'
import debounce from 'lodash/debounce'

const ElevatorContext = React.createContext({})

let timeout
function delay (callback, duration) {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => callback(), duration)
}

export const ElevatorProvider = ({ children }) => {
  const [currentFloor, setCurrentFloor] = React.useState(0)
  const [targetFloor, setTargetFloor] = React.useState(0)
  const [queue, setQueue] = React.useState([])
  const [isReceivingInput, setIsReceivingInput] = React.useState(false)
  const [duration, setDuration] = React.useState(1000)
  const [direction, setDirection] = React.useState('up')

  const currentFloorRef = React.useRef()
  const queueRef = React.useRef()
  currentFloorRef.current = currentFloor
  queueRef.current = queue
  
  const addFloorToQueue = floor => {
    const newQueue = [...queue, floor]
    setQueue(newQueue)
  }

  const execute = async () => {
    const first = queue[0]
    const _direction = first > currentFloor ? 'up' : 'down'
    setDirection(_direction)

    const route = queue.sort((a, b) => {
      if (_direction === 'up') {
        if (a < b) return -1
        else if (a > b) return 1
        return 0
      }
      if (a > b) return -1
      else if (a < b) return 1
      return 0
    })

    for(let i=0;i<route.length;i++) {
      await moveToFloor(route[i])
      setCurrentFloor(route[i])

      const newQueue = [...queueRef.current]
      newQueue.splice(newQueue.indexOf(route[i]), 1)
      setQueue(newQueue)

      await waitAtFloor()
    }
  }

  const moveToFloor = (floor) => {
    return new Promise((resolve, reject) => {
      const _duration = Math.abs(floor - currentFloorRef.current) * 1000
      setDuration(_duration)
      setTargetFloor(floor)
      setTimeout(resolve, _duration)
    })
  }

  const waitAtFloor = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })
  }

  const calculateOffset = (floor) => {
    return floor * (140 + 12)
  }

  const context = {
    currentFloor,
    targetFloor,
    addFloorToQueue,
    queue,
    calculateOffset,
    duration,
    direction,
    execute
  }
  
  React.useEffect(() => {

  }, [])

  return <ElevatorContext.Provider value={context}>
    {children}
  </ElevatorContext.Provider>
}

export default ElevatorContext