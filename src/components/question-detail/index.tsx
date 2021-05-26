import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import format from 'date-fns/format'
import clsx from 'clsx'
import {
  Grow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import Close from '@material-ui/icons/Close'
import { useComments } from '../../hooks/comments'
import { ConfirmationDialog, Text } from '../../styleguide'
import { QuestionDTO } from '../../types/api'
import { CommentList } from '../comment-list'
import { useAuth } from '../../contexts/auth'
import { useDeleteQuestion } from '../../hooks/questions'

type Props = {
  question: QuestionDTO | undefined
  onClose: () => void
}

export const QuestionDetail: React.FC<Props> = ({ question, onClose }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const history = useHistory()
  const { user } = useAuth()

  const { mutateAsync: deleteQuestion, isLoading: isDeletingQuestion } =
    useDeleteQuestion()
  const commentsQuery = useComments(
    { questionId: question?.id ?? 0 },
    { enabled: !!question?.id }
  )

  const notMyQuestion = user?.id !== question?.user

  return (
    <Grow in={!!question}>
      <div
        className={clsx({
          // change classes here to fix quickview tooltip behavior
          'w-1/2 visible ml-6': !!question,
          'w-0 invisible': !question,
        })}
      >
        <Paper className="p-6 sticky" style={{ top: 88 }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex">
              <Avatar className="w-16 h-16" />
              <div className="ml-4">
                <Text variant="h2">{question?.title}</Text>
                <Text>
                  by{' '}
                  <span
                    className={clsx('font-semibold', {
                      'cursor-pointer': notMyQuestion,
                    })}
                    onClick={() =>
                      notMyQuestion
                        ? history.push(`/user/${question?.user}`)
                        : null
                    }
                  >
                    {question?.userName} {question?.userSurname}
                  </span>
                </Text>
                {question?.created_at && (
                  <Text variant="body2">
                    {format(
                      new Date(question!.created_at),
                      'dd.MM.yyyy, HH:mm'
                    )}
                  </Text>
                )}
              </div>
            </div>
            <div className="space-x-2">
              {question?.user === user?.id && (
                <Tooltip title="Delete question">
                  <IconButton
                    size="small"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Close detail">
                <IconButton size="small" edge="end" onClick={onClose}>
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <Text>{question?.description ?? '(No description)'}</Text>

          <Text variant="h2" className="mt-8">
            Comments {commentsQuery.data && `(${commentsQuery.data.length})`}
          </Text>
          <Divider className="mt-2 mb-4" />
          {commentsQuery.isLoading && <p>Loading...</p>}
          {commentsQuery.isError && <p>Error :(</p>}

          {commentsQuery.isSuccess && commentsQuery.data && (
            <CommentList
              questionId={question!.id}
              comments={commentsQuery.data}
            />
          )}
        </Paper>

        <ConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() =>
            deleteQuestion(question!.id).finally(() => {
              setDeleteDialogOpen(false)
              onClose()
            })
          }
          loading={isDeletingQuestion}
          description="Are you sure you want to delete this question? All its comments will also be deleted."
          confirmText="Delete"
        />
      </div>
    </Grow>
  )
}
