import { Link } from 'react-router-dom'
import { Button } from '../styleguide/button'

export const Home: React.FC = () => {
  return (
    <div>
      <p>Home</p>
      <Button component={Link} to="/register">
        Go to register
      </Button>
      <Button component={Link} to="/login">
        Go to login
      </Button>
    </div>
  )
}
