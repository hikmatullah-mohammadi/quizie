import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import MyApp from './MyApp'
import store from './store'

const { render } = ReactDOM
const { StrictMode } = React
render(
  <StrictMode>
  <Provider store={store}>
    <MyApp />
  </Provider>
  </StrictMode>,
  document.getElementById('root')
)