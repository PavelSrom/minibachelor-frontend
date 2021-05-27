import { Avatar, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { userSkeletons } from '../../components/skeletons'
import { useAuth } from '../../contexts/auth'
import { useColleagues } from '../../hooks/colleagues'
import { Text } from '../../styleguide'

export const MyTeachers: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()

  const teachersQuery = useColleagues({
    role: 'teacher',
    school: user?.school,
    programme: user?.programme,
  })

  if (teachersQuery.isLoading || !teachersQuery.data) return userSkeletons()
  if (teachersQuery.isError) return <p>Error :(</p>

  // filter out myself from the list
  const teachers = teachersQuery.data?.filter(t => t.id !== user?.id)

  return (
    <>
      {teachers.length > 0 ? (
        <div className="grid grid-cols-12 gap-6">
          {teachers!.map(user => (
            <div key={user.id} className="col-span-3">
              <Paper
                className="p-6 flex flex-col items-center cursor-pointer"
                onClick={() => history.push(`/user/${user.id}`)}
              >
                <Avatar className="w-20 h-20 mb-4" />
                <Text variant="h2" className="truncate">
                  {user.username}
                </Text>
              </Paper>
            </div>
          ))}
        </div>
      ) : (
        <Text>(There are no teachers to show)</Text>
      )}
    </>
  )
}
