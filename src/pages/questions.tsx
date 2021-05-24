import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Container,
  Paper,
  IconButton,
  InputBase,
  TextField,
  Divider,
  MenuItem,
  Fab,
  Tooltip,
} from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import ContactSupport from '@material-ui/icons/ContactSupport'
import { useQuestions } from '../hooks/questions'
import { QuestionList } from '../components/question-list'
import { QuestionDTO } from '../types/api'
import { QuestionDetail } from '../components/question-detail'
import { Text } from '../styleguide'
import { NewQuestionModal } from '../components/new-question-modal'
import { useAuth } from '../contexts/auth'
import { schools } from '../utils/schools'
import { QuestionRowSkeleton } from '../components/skeletons/question-row'

const questionSkeleton = (
  <div className="space-y-2">
    {[...new Array(8).keys()].map(key => (
      <QuestionRowSkeleton key={key} />
    ))}
  </div>
)

export const Questions: React.FC = () => {
  const { user } = useAuth()

  const [detailOpen, setDetailOpen] = useState<QuestionDTO | undefined>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [school, setSchool] = useState<string>(user?.school ?? '')

  // correctly set 'school' text field value on first load
  useEffect(() => {
    if (user) setSchool(user?.school)
  }, [user])

  const questionsQuery = useQuestions({ school, programme: user?.programme })

  return (
    <Container maxWidth="lg" className="py-8">
      <Text variant="h1">People's questions</Text>
      <Text className="mt-2 mb-16">Lorem ipsum</Text>
      <div className="flex justify-between items-end">
        <Paper
          component="form"
          className="w-full max-w-md flex items-center p-1"
        >
          <IconButton>
            <Search />
          </IconButton>
          <InputBase
            className="ml-2 flex-1"
            placeholder="Search questions..."
          />
          <IconButton>
            <Close />
          </IconButton>
        </Paper>

        <div className="flex items-end space-x-4">
          <TextField
            size="small"
            variant="outlined"
            label="School"
            value={school}
            onChange={e => {
              setSchool(e.target.value)
              setDetailOpen(undefined) // close quickview on school change
            }}
            select={!!schools[school]}
            InputLabelProps={{ shrink: true }}
          >
            {Object.keys(schools).map(school => (
              <MenuItem key={school} value={school}>
                {school}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            variant="outlined"
            label="Programme"
            disabled
            value={user?.programme}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>
      <Divider className="mt-2 mb-6" />

      {questionsQuery.isLoading && questionSkeleton}
      {questionsQuery.isError && <p>Error :(</p>}

      {questionsQuery.isSuccess && questionsQuery.data && (
        <div className="flex">
          <div
            className={clsx('transition-all duration-250', {
              'w-full': !detailOpen,
              'w-1/2': detailOpen,
            })}
          >
            <QuestionList
              questions={questionsQuery.data}
              onDetailClick={q => setDetailOpen(q)}
              detailOpen={!!detailOpen}
            />
          </div>

          <QuestionDetail
            question={detailOpen}
            onClose={() => setDetailOpen(undefined)}
          />
        </div>
      )}

      <NewQuestionModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Tooltip title="Ask question" placement="left">
        <Fab
          color="secondary"
          className="fixed bottom-4 right-4 text-white"
          onClick={() => setModalOpen(true)}
        >
          <ContactSupport />
        </Fab>
      </Tooltip>
    </Container>
  )
}
