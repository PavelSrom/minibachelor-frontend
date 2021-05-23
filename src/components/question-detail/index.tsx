import {
  Grow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import format from 'date-fns/format'
import clsx from 'clsx'
import { useComments } from '../../hooks/comments'
import { Text } from '../../styleguide'
import { QuestionDTO } from '../../types/api'
import { CommentList } from '../comment-list'
import { useAuth } from '../../contexts/auth'

type Props = {
  question: QuestionDTO | undefined
  onClose: () => void
}

export const QuestionDetail: React.FC<Props> = ({ question, onClose }) => {
  const history = useHistory()
  const { user } = useAuth()

  const commentsQuery = useComments(question?._id || '', {
    enabled: !!question?._id,
  })

  const notMyQuestion = user?._id !== question?.userId

  return (
    <Grow in={!!question}>
      <div
        className={clsx({
          // change classes here to fix quickview tooltip behavior
          'w-1/2 visible ml-8': !!question,
          'w-0 invisible': !question,
        })}
      >
        <Paper className="p-6 sticky top-20">
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
                        ? history.push(`/user/${question?.userId}`)
                        : null
                    }
                  >
                    {question?.userName} {question?.userSurname}
                  </span>
                </Text>
                {question?.createdAt && (
                  <Text variant="body2">
                    {format(new Date(question!.createdAt), 'dd.MM.yyyy, hh:MM')}
                  </Text>
                )}
              </div>
            </div>
            <Tooltip title="Close detail">
              <IconButton size="small" edge="end" onClick={onClose}>
                <Close />
              </IconButton>
            </Tooltip>
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
              entityId={question!._id}
              comments={commentsQuery.data}
            />
          )}
        </Paper>
      </div>
    </Grow>
  )
}
