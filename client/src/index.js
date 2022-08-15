import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import MyApp from './MyApp'
import store from './store'

const { render } = ReactDOM
const { StrictMode } = React

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const domain = process.env.REACT_APP_AUTH0_DOMAIN

render(
  <StrictMode>
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <MyApp />
      </Provider>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root')
)