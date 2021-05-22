import { Dialog, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNewQuestion } from '../../hooks/questions'
import { Text, TextField, Button } from '../../styleguide'
import { NewQuestionPayload } from '../../types/payloads'

const initialValues = {
  title: '',
  description: '',
  isPublic: false,
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  isPublic: Yup.boolean().required('This field is required'),
})

type Props = {
  open: boolean
  onClose: () => void
}

export const NewQuestionModal: React.FC<Props> = ({ open, onClose }) => {
  const { mutateAsync: postQuestion, isLoading: isPostingQuestion } =
    useNewQuestion()

  const handleSubmit = (values: NewQuestionPayload): void => {
    postQuestion(values).then(() => onClose())
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: 'p-8' }}
    >
      <div className="flex justify-between items-center mb-16">
        <Text variant="h1">Add new question</Text>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-8">
          <TextField name="title" label="Question title" />
          <TextField
            name="description"
            label="Question description"
            multiline
          />
          <Button
            fullWidth
            type="submit"
            color="secondary"
            loading={isPostingQuestion}
          >
            Post question
          </Button>
        </Form>
      </Formik>
    </Dialog>
  )
}
