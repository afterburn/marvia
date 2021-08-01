import React from 'react'
import styled from 'styled-components'

import ElevatorContext from '../context/ElevatorContext'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

interface IProps {
  className?: string,
  index: number,
  total: number
}

const Floor : React.FC<IProps> = styled((props: IProps) => {
  const { requestElevator, queue } = React.useContext(ElevatorContext)

  const queuedFloorIndex = queue.findIndex((j: { floor: number }) => j.floor === props.index)
  const queuedFloor : any = queue[queuedFloorIndex]
  const isQueued = queuedFloorIndex !== -1

  return <div className={props.className}>
  <div className='floor'>
    Floor {props.index + 1}
  </div>
    <div className='buttons'>
      {props.index + 1 !== props.total &&
        <button onClick={() => requestElevator(props.index, 'up')}>
          <FaArrowUp color={isQueued && queuedFloor.direction === 'up' ? 'var(--accentColor)' : '#000'} />
        </button>
      }
      {props.index !== 0 &&
        <button onClick={() => requestElevator(props.index, 'down')}>
          <FaArrowDown color={isQueued && queuedFloor.direction === 'down' ? 'var(--accentColor)' : '#000'} />
        </button>
      }
    </div>
  </div>
})`
  display: flex;
  align-items: center;
  margin-top: 12px;

  .floor {
    width: var(--floorSize);
    height: var(--floorSize);
    background-color: #4D4D68;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 12px;
  }

  .buttons {
    display: flex;
    flex-direction: column;

    button {
      border: 0;
      outline: 0;
      border-radius: 50%;
    }
  }
`

export default Floor