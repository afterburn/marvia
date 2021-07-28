import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'

import ElevatorContext from '../context/elevator'

const Elevator = styled(({ className }) => {
  const {
    currentFloor,
    targetFloor,
    calculateOffset,
    queue,
    addFloorToQueue,
    duration,
    direction,
    execute
  } = React.useContext(ElevatorContext)
  
  const yOffset = calculateOffset(targetFloor)

  return <div className={className} style={{
    transform: `translate3d(0px, -${yOffset}px, 0px)`,
    transition: `transform ${duration}ms linear`
  }}>
    <span>{currentFloor + 1} {direction}</span>
    <div className='buttons'>
      {Array.from(Array(5)).map((_, i) => {
        const isQueued = queue.findIndex(j => j === i) !== -1
        return <button
          key={i}
          className={cn({
            active: isQueued,
            current: currentFloor === i
          })}
          onClick={() => addFloorToQueue(i)}>
            {i + 1}
        </button>
      })}
      <button onClick={execute}>Go</button>
    </div>
  </div>
})`
  position: absolute;
  bottom: 0;
  left: 0;

  border-radius: var(--borderRadius);
  width: var(--floorSize);
  height: var(--floorSize);
  background-color: #13B38B;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: white;
    padding: 4px 12px;
    background-color: #000;
    border-radius: var(--borderRadius);
    margin-bottom: 8px;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    width: 56px;

    button {
      flex: 0 1 calc(50% - 8px);
      border-radius: 50%;
      border: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 20px;
      height: 20px;
      margin: 4px;
      font-weight: bold;

      &.active {
        border: 1px solid #9457FF;
        color: #9457FF;
      }

      &.current {
        background-color: #9457FF;
        color: white;
      }
    }
  }
`

export default Elevator