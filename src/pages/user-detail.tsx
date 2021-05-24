import { useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Avatar, Container, Paper, Tabs, Tab, Divider } from '@material-ui/core'
import { Text } from '../styleguide'
import { useQuestions } from '../hooks/questions'
import { useAuth } from '../contexts/auth'
import { QuestionRow } from '../components/question-row'
import { QuestionDTO } from '../types/api'
import { QuestionDetail } from '../components/question-detail'
import { useColleagueDetail } from '../hooks/colleagues'
import { QuestionRowSkeleton } from '../components/skeletons/question-row'

const QUESTIONS = 0
const PROJECTS = 1

const questionSkeleton = (
  <div className="space-y-6">
    {[...new Array(4).keys()].map(key => (
      <QuestionRowSkeleton key={key} />
    ))}
  </div>
)

export const UserDetail: React.FC = () => {
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const [detailOpen, setDetailOpen] = useState<QuestionDTO | undefined>()
  const [tabValue, setTabValue] = useState<0 | 1>(QUESTIONS)

  const detailQuery = useColleagueDetail(params.id, {
    enabled: !!params.id,
  })

  const questionsQuery = useQuestions(
    { user: params.id },
    {
      enabled: tabValue === QUESTIONS,
    }
  )

  const { data: colleague } = detailQuery

  // cannot view projects if not person from same school AND programme
  const cannotViewProjects =
    colleague &&
    colleague.school !== user?.school &&
    colleague?.programme !== user?.programme

  return (
    <Container maxWidth="lg" className="py-8">
      {detailQuery.isLoading && <p>Loading...</p>}
      {detailQuery.isError && <p>Error :(</p>}

      {detailQuery.isSuccess && colleague && (
        <div className="flex">
          <div
            className={clsx('transition-all duration-250', {
              'w-full': !detailOpen,
              'w-1/2': detailOpen,
            })}
          >
            <Paper className="p-6 max-w-3xl mx-auto">
              <div className="flex mb-16">
                <Avatar className="w-28 h-28 bg-theme-secondary text-4xl">
                  {colleague.name[0].toUpperCase() +
                    colleague.surname[0].toUpperCase()}
                </Avatar>
                <div className="ml-4 space-y-2">
                  <Text variant="h1">
                    {colleague.name} {colleague.surname}
                  </Text>
                  <Text>{colleague.role}</Text>
                  <Text>
                    {colleague.school} | {colleague.programme}
                  </Text>
                </div>
              </div>

              <Tabs
                indicatorColor="primary"
                value={tabValue}
                onChange={(_e, newValue) => setTabValue(newValue)}
              >
                <Tab value={QUESTIONS} label="Questions" />
                <Tab
                  value={PROJECTS}
                  label="Projects"
                  disabled={cannotViewProjects}
                />
              </Tabs>
              <Divider className="mb-8" />

              {tabValue === QUESTIONS && (
                <>
                  {questionsQuery.isLoading && questionSkeleton}
                  {questionsQuery.error && <p>Error :(</p>}

                  {questionsQuery.isSuccess && questionsQuery.data && (
                    <>
                      {questionsQuery.data.length > 0 ? (
                        <div className="space-y-6">
                          {questionsQuery.data.map(q => (
                            // TODO: adjust what info the row shows
                            <QuestionRow
                              key={q._id}
                              question={q}
                              detailOpen={!!detailOpen}
                              onDetailClick={() => setDetailOpen(q)}
                            />
                          ))}
                        </div>
                      ) : (
                        <Text variant="body2">
                          (There are no questions to show)
                        </Text>
                      )}
                    </>
                  )}
                </>
              )}

              {tabValue === PROJECTS && null}
            </Paper>
          </div>
          <QuestionDetail
            question={detailOpen}
            onClose={() => setDetailOpen(undefined)}
          />
        </div>
      )}
    </Container>
  )
}
