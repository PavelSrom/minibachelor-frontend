import { memo } from 'react'
import format from 'date-fns/format'
import { Avatar, IconButton, Paper, Tooltip } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import { Text } from '../../styleguide'
import { QuestionDTO } from '../../types/api'

type Props = {
  question: QuestionDTO
  onDetailClick?: () => void
}

export const QuestionRow: React.FC<Props> = memo(({ question }) => {
  const userInitials =
    question.userName[0].toUpperCase() + question.userSurname[0].toUpperCase()

  return (
    <Paper className="px-2 py-4 grid grid-cols-12">
      <div className="col-span-6 px-2 flex items-center">
        <Text variant="body" className="font-semibold overflow-ellipsis">
          {question.title}
        </Text>
      </div>
      <div className="col-span-6 px-2 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-2">{userInitials}</Avatar>
          <Text variant="body2">
            by{' '}
            <span className="font-semibold cursor-pointer">{`${question.userName} ${question.userSurname}`}</span>
          </Text>
        </div>

        <Text variant="body2">
          {format(new Date(question.createdAt), 'dd.MM.yyyy, hh:mm')}
        </Text>

        <Tooltip title="View detail">
          <IconButton size="small">
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  )
})

QuestionRow.displayName = 'QuestionRow'
