import { render } from 'react-dom'
import './index.css'
import { App } from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthProvider } from './contexts/auth'

const app = (
  <AuthProvider>
    <App />
  </AuthProvider>
)

render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
