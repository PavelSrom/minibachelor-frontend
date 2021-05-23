import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './hoc/private-route'
// pages
import { UserDetail } from './pages/user-detail'
import { Dashboard } from './pages/dashboard'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Projects } from './pages/projects'
import { Questions } from './pages/questions'
import { Register } from './pages/register'

export const App: React.FC = () => {
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
