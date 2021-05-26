import { useEffect } from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './hoc/private-route'
import { useDevice } from './hooks/use-device'
import { OnlyDesktop } from './components/only-desktop'
// pages
import { UserDetail } from './pages/user-detail'
import { Dashboard } from './pages/dashboard'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Projects } from './pages/projects'
import { Questions } from './pages/questions'
import { Register } from './pages/register'

export const App: React.FC = () => {
  const { width } = useDevice()

  // remove axios token on app load, otherwise causes bugs on API
  useEffect(() => {
    delete axios.defaults.headers['Authorization']
  }, [])

  if (width < 1024) return <OnlyDesktop />

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/questions" component={Questions} />
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute exact path="/user/:id" component={UserDetail} />
    </Switch>
  )
}
