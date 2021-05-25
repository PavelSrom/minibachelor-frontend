import { Avatar, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { useColleagues } from '../../hooks/colleagues'
import { Text } from '../../styleguide'

export const MyClassmates: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()

  const classmatesQuery = useColleagues('student')

  if (classmatesQuery.isLoading) return <p>Loading...</p>
  if (classmatesQuery.isError) return <p>Error :(</p>

  // filter out myself from the list
  const classmates = classmatesQuery.data?.filter(cm => cm._id !== user?._id)

  return (
    <>
      {classmatesQuery.data!.length > 0 ? (
        <div className="grid grid-cols-12 gap-6">
          {classmates!.map(user => (
            <div key={user._id} className="col-span-3">
              <Paper
                className="p-6 flex flex-col items-center cursor-pointer"
                onClick={() => history.push(`/user/${user._id}`)}
              >
                <Avatar className="w-20 h-20 mb-4" />
                <Text variant="h2">{user.name + ' ' + user.surname}</Text>
              </Paper>
            </div>
          ))}
        </div>
      ) : (
        <Text variant="body2">(There are no classmates to show)</Text>
      )}
    </>
  )
}
