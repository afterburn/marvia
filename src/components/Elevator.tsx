import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'

import ElevatorContext from '../context/ElevatorContext'

interface IProps {
  className: string
}

const Elevator: React.FC = styled((props: IProps) => {
  const {
    queue,
    addFloorToQueue,
    execute,
    direction,
    currentFloor,
    yOffset,
    duration
  } = React.useContext(ElevatorContext)

  return <div className={props.className} style={{
    transform: `translate3d(0px, -${yOffset}px, 0)`,
    transition: `transform ${duration}ms linear`
  }}>
    <span>{currentFloor + 1} {direction}</span>
    <div className='buttons'>
      {Array.from(Array(5)).map((_, i) => {
        const isQueued = queue.findIndex(j => j.floor === i) !== -1
        const buttonClass = cn({
          active: isQueued,
          current: currentFloor === i
        })

        return <button
          key={i}
          className={buttonClass}
          onClick={() => addFloorToQueue(i)}>
            {i + 1}
        </button>
      })}
      <button onClick={() => execute()}>Go</button>
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
    width: 48px;

    button {
      flex: 0 1 calc(50% - 4px);
      border-radius: 50%;
      border: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 20px;
      height: 20px;
      margin: 2px;
      font-weight: bold;

      &.active {
        border: 1px solid var(--accentColor);
        color: var(--accentColor);
      }

      &.current {
        background-color: var(--accentColor);
        color: white;
      }
    }
  }
`

export default Elevator