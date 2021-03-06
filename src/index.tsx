import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import './index.css'
import { App } from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthProvider } from './contexts/auth'
import { queryClient } from './utils/query-client'
import { muiTheme } from './utils/theme'

require('./utils/axios-interceptor')

const app = (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <SnackbarProvider
          dense
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Router>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
