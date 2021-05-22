import { Grow, Paper, Avatar, IconButton, Tooltip } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import clsx from 'clsx'
import { Text } from '../../styleguide'
import { QuestionDTO } from '../../types/api'

type Props = {
  question: QuestionDTO | undefined
  onClose: () => void
}

export const QuestionDetail: React.FC<Props> = ({ question, onClose }) => {
  return (
    <Grow in={!!question}>
      <div
        className={clsx({
          // change classes here to fix quickview tooltip behavior
          'ml-8 self-start': true,
          'w-1/2 visible': !!question,
          'w-0 invisible': !question,
        })}
      >
        <Paper className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex">
              <Avatar className="w-16 h-16" />
              <div className="ml-4">
                <Text variant="h2">{question?.title}</Text>
                <Text>
                  by{' '}
                  <span className="font-semibold cursor-pointer">
                    {question?.userName} {question?.userSurname}
                  </span>
                </Text>
              </div>
            </div>
            <Tooltip title="Close detail">
              <IconButton size="small" edge="end" onClick={onClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>

          <Text>{question?.description ?? '(No description)'}</Text>
        </Paper>
      </div>
    </Grow>
  )
}
