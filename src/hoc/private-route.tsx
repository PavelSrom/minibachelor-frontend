import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { WithLayout } from './with-layout'

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
        isAuthenticated ? (
          <WithLayout>
            <Component {...props} />
          </WithLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
