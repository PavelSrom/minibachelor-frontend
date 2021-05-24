import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Delete from '@material-ui/icons/Delete'
import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import { Text, TextField, Button, ConfirmationDialog } from '../../styleguide'
import { CommentDTO } from '../../types/api'
import { useDeleteComment, useNewComment } from '../../hooks/comments'
import { NewCommentPayload } from '../../types/payloads'
import { useAuth } from '../../contexts/auth'

const validationSchema = Yup.object().shape({
  text: Yup.string().required('This field is required'),
})

type Props = {
  entityId: string
  comments: CommentDTO[]
}

export const CommentList: React.FC<Props> = ({ entityId, comments }) => {
  const [comIdToDelete, setComIdToDelete] = useState<string | undefined>()
  const { user } = useAuth()

  const { mutateAsync: addComment, isLoading } = useNewComment()
  const { mutateAsync: deleteComment } = useDeleteComment()

  const handleSubmit = (
    values: NewCommentPayload,
    { resetForm }: FormikHelpers<NewCommentPayload>
  ): void => {
    addComment({ entityId, formData: values }).finally(() => resetForm())
  }

  return (
    <>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className="flex mb-6">
            <Avatar className="w-10 h-10">
              {comment.userName[0].toUpperCase() +
                comment.userSurname[0].toUpperCase()}
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <Text className="font-semibold">
                  {comment.userName + ' ' + comment.userSurname}
                </Text>
                <div className="flex items-center space-x-2">
                  {user?._id === comment.userId && (
                    <Tooltip title="Delete this comment">
                      <IconButton
                        className="p-0"
                        onClick={() => setComIdToDelete(comment._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Text>
                    {formatDistanceToNow(new Date(comment.createdAt)) + ' ago'}
                  </Text>
                </div>
              </div>
              <Text variant="body2">{comment.text}</Text>
            </div>
          </div>
        ))
      ) : (
        <Text variant="body2" className="mb-4">
          (There are no comments)
        </Text>
      )}

      <Formik
        initialValues={{ text: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="text" label="Text" multiline />
          <div className="mt-2 flex justify-end">
            <Button type="submit" loading={isLoading} color="secondary">
              Add comment
            </Button>
          </div>
        </Form>
      </Formik>

      <ConfirmationDialog
        open={!!comIdToDelete}
        onClose={() => setComIdToDelete(undefined)}
        onConfirm={() =>
          deleteComment({ entityId, commentId: comIdToDelete! }).finally(() =>
            setComIdToDelete(undefined)
          )
        }
        confirmText="Delete"
      />
    </>
  )
}
