import { useMemo } from 'react'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { QuestionDTO } from '../../types/api'
import { Text } from '../../styleguide'
import { QuestionRow } from '../question-row'

type Props = {
  questions: QuestionDTO[]
}

export const QuestionList: React.FC<Props> = ({ questions }) => {
  const now = new Date()

  const renderQuestions = (questions: QuestionDTO[]) => {
    return (
      <div className="space-y-2">
        {questions.map(q => (
          <QuestionRow key={q._id} question={q} />
        ))}
      </div>
    )
  }

  const questionsToday = useMemo(
    () =>
      questions.filter(
        q => differenceInCalendarDays(new Date(q.createdAt), now) === 0
      ),
    // eslint-disable-next-line
    [questions]
  )
  const questionsThisWeek = useMemo(
    () =>
      questions.filter(
        q => differenceInCalendarDays(new Date(q.createdAt), now) < 7
      ),
    // eslint-disable-next-line
    [questions]
  )

  return (
    <>
      <Text variant="h2" className="mt-6 mb-2">
        Today
      </Text>
      {questionsToday.length > 0 ? (
        renderQuestions(questionsToday)
      ) : (
        <Text>(There are no questions for today)</Text>
      )}

      <Text variant="h2" className="mt-6 mb-2">
        This week
      </Text>
      {questionsThisWeek.length > 0 ? (
        renderQuestions(questionsThisWeek)
      ) : (
        <Text>(There are no questions this week)</Text>
      )}
    </>
  )
}
