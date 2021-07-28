import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import GlobalStyle from './style'

import Building from './components/Building'

const App = styled(({ className }) => {
  return <div className={className}>
    <GlobalStyle />
    <Building />
  </div>
})`
  display: flex;
  align-items: center;
  justify-content: center;
`

ReactDOM.render(
  <App />,
  document.getElementById('root')
)