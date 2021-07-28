import React from 'react'
import styled from 'styled-components'
import { ElevatorProvider } from '../context/elevator'

import Floor from './Floor'
import Elevator from './Elevator'

const Building = styled(({ className }) => {
  return <div className={className}>
    <ElevatorProvider>
      {Array.from(Array(5)).map((_, i) => {
        return <Floor key={i} index={i} />
      })}
      <Elevator />
    </ElevatorProvider>
  </div>
})`
  position: relative;
`

export default Building