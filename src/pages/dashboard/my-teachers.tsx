import { Avatar, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { userSkeletons } from '../../components/skeletons'
import { useAuth } from '../../contexts/auth'
import { useColleagues } from '../../hooks/colleagues'
import { Text } from '../../styleguide'

export const MyTeachers: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()

  const teachersQuery = useColleagues('teacher')

  if (teachersQuery.isLoading) return userSkeletons()
  if (teachersQuery.isError) return <p>Error :(</p>

  // filter out myself from the list
  const teachers = teachersQuery.data?.filter(cm => cm._id !== user?._id)

  return (
    <>
      {teachersQuery.data!.length > 0 ? (
        <div className="grid grid-cols-12 gap-6">
          {teachers!.map(user => (
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
        <Text variant="body2">(There are no teachers to show)</Text>
      )}
    </>
  )
}
