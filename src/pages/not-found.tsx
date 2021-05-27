import { useHistory } from 'react-router-dom'
import { Button, Text } from '../styleguide'

export const NotFound: React.FC = () => {
  const history = useHistory()

  return (
    <section className="min-h-screen flex flex-col justify-center items-center space-y-8">
      <img
        src="/images/notfound.svg"
        alt="notfound.svg"
        className="max-w-3xl h-auto"
      />
      <Text variant="h1">This page does not exist</Text>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
    </section>
  )
}
