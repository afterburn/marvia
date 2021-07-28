import React from 'react'
import styled from 'styled-components'

const Floor = styled(({ className, index }) => {
  return <div className={className}>
  <div className='floor'>
    Floor {index + 1}
  </div>
    <div className='buttons'>
      <button>up</button>
      <button>down</button>
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
  }
`

export default Floor