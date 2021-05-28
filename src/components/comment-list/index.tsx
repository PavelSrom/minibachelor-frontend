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
  comment: Yup.string().required('This field is required'),
})

type Props = {
  comments: CommentDTO[]
  questionId?: number
  projectId?: number
}

export const CommentList: React.FC<Props> = ({
  questionId,
  projectId,
  comments,
}) => {
  const [comIdToDelete, setComIdToDelete] = useState<number | undefined>()
  const { user } = useAuth()

  const { mutateAsync: addComment, isLoading } = useNewComment()
  const { mutateAsync: deleteComment } = useDeleteComment()

  const handleSubmit = (
    values: NewCommentPayload,
    { resetForm }: FormikHelpers<NewCommentPayload>
  ): void => {
    addComment({
      filters: { questionId, projectId },
      formData: { ...values, user: user!.id },
    }).finally(() => resetForm())
  }

  return (
    <>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="flex mb-6">
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
                  {user?.id === comment.user && (
                    <Tooltip title="Delete this comment">
                      <IconButton
                        className="p-0"
                        onClick={() => setComIdToDelete(comment.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Text variant="body2">
                    {formatDistanceToNow(new Date(comment.created_at)) + ' ago'}
                  </Text>
                </div>
              </div>
              <Text>{comment.comment}</Text>
            </div>
          </div>
        ))
      ) : (
        <Text className="mb-4">(There are no comments)</Text>
      )}

      <Formik
        initialValues={{ comment: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="comment" label="Text" multiline rowsMax={4} />
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
          deleteComment(comIdToDelete!).finally(() =>
            setComIdToDelete(undefined)
          )
        }
        description="Are you sure you want to delete this comment?"
        confirmText="Delete"
      />
    </>
  )
}
