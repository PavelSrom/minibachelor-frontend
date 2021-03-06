import {
  Dialog,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../contexts/auth'
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
  onCreated?: () => void
}

export const NewQuestionModal: React.FC<Props> = ({
  open,
  onClose,
  onCreated,
}) => {
  const { user } = useAuth()
  const { mutateAsync: postQuestion, isLoading: isPostingQuestion } =
    useNewQuestion()

  const handleSubmit = (values: NewQuestionPayload): void => {
    postQuestion({ ...values, user: user!.id }).then(() => {
      onCreated?.()
      onClose()
    })
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
        <Text variant="h1">Ask question</Text>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-8">
              <TextField
                name="title"
                label="Question title"
                inputProps={{ maxLength: 80 }}
              />
              <div className="flex justify-end">
                <Text variant="caption">
                  {80 - values.title.length} characters left
                </Text>
              </div>
            </div>
            <TextField
              name="description"
              label="Question description"
              multiline
              className="mb-6"
            />
            <FormControlLabel
              label="People from other schools can see my question"
              classes={{ label: 'font-light' }}
              control={
                <Checkbox
                  color="primary"
                  checked={values.isPublic}
                  onChange={e => setFieldValue('isPublic', e.target.checked)}
                />
              }
              className="mb-6"
            />
            <Button
              fullWidth
              type="submit"
              color="secondary"
              loading={isPostingQuestion}
            >
              Ask
            </Button>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
