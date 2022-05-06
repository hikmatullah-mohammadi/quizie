import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyApp from './MyApp'

const { render } = ReactDOM
const { StrictMode } = React
render(
  <StrictMode>
      <MyApp />
  </StrictMode>,
  document.getElementById('root')
)