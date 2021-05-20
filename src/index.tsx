import { render } from 'react-dom'
import { StylesProvider } from '@material-ui/core'
import './index.css'
import { App } from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthProvider } from './contexts/auth'

const app = (
  <StylesProvider injectFirst>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StylesProvider>
)

render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
