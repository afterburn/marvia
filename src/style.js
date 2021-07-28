import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --borderRadius: 4px;
    --floorSize: 140px;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    box-sizing: border-box;
  }

  html, body {
    background-color: #E5E5EA;
  }
`
