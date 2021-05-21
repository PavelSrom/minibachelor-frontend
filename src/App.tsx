import { Switch, Route } from 'react-router-dom'
import { ColleagueDetail } from './pages/colleague-detail'
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
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/questions" component={Questions} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/colleague/:id" component={ColleagueDetail} />
    </Switch>
  )
}
