import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/auth'

type Props = {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}

export const PrivateRoute: React.FC<Props> = ({
  exact,
  path,
  component: Component,
}) => {
  const { isAuthenticated } = useAuth()

  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
