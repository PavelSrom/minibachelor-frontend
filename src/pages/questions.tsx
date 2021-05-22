import { useState } from 'react'
import {
  Container,
  Paper,
  IconButton,
  InputBase,
  TextField,
  Divider,
  MenuItem,
} from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import { useQuestions } from '../hooks/questions'
import { QuestionList } from '../components/question-list'

export const Questions: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('newest')

  const questionsQuery = useQuestions()

  return (
    <Container maxWidth="lg" className="py-8">
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

        <div>
          <TextField
            size="small"
            variant="outlined"
            label="Sort by"
            select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </TextField>
        </div>
      </div>
      <Divider className="mt-2 mb-8" />

      {questionsQuery.isLoading && <p>Loading...</p>}
      {questionsQuery.isError && <p>Error :(</p>}

      {questionsQuery.isSuccess && questionsQuery.data && (
        <QuestionList questions={questionsQuery.data} />
      )}
    </Container>
  )
}
