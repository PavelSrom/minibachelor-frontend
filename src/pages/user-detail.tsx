import { useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import {
  Avatar,
  Container,
  Paper,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
} from '@material-ui/core'
import { Text } from '../styleguide'
import { useQuestions } from '../hooks/questions'
import { useAuth } from '../contexts/auth'
import { QuestionRow } from '../components/question-row'
import { ProjectDTO, QuestionDTO } from '../types/api'
import { QuestionDetail } from '../components/question-detail'
import { useColleagueDetail } from '../hooks/colleagues'
import { projectSkeletons, questionSkeletons } from '../components/skeletons'
import { useProjects } from '../hooks/projects'
import { ProjectCard } from '../components/project-card'
import { ProjectDetail } from '../components/project-detail'

const QUESTIONS = 0
const PROJECTS = 1

export const UserDetail: React.FC = () => {
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const [qDetailOpen, setQDetailOpen] = useState<QuestionDTO | undefined>()
  const [pDetailOpen, setPDetailOpen] = useState<ProjectDTO | undefined>()
  const [tabValue, setTabValue] = useState<0 | 1>(QUESTIONS)

  const detailQuery = useColleagueDetail(+params.id, {
    enabled: !!params.id,
  })

  const questionsQuery = useQuestions(
    { user: +params.id },
    { enabled: tabValue === QUESTIONS }
  )
  const projectsQuery = useProjects(
    { user: +params.id },
    { enabled: tabValue === PROJECTS }
  )

  const { data: colleague } = detailQuery

  // cannot view projects if not person from same school AND programme
  const cannotViewProjects =
    colleague &&
    colleague.school !== user?.school &&
    colleague?.programme !== user?.programme

  return (
    <Container maxWidth="lg" className="py-8 h-full flex flex-col">
      {detailQuery.isLoading && (
        <div className="flex-1 justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      )}
      {detailQuery.isError && <p>Error :(</p>}

      {detailQuery.isSuccess && colleague && (
        <div className="flex">
          <div
            className={clsx('transition-all duration-250', {
              'w-full': !qDetailOpen && !pDetailOpen,
              'w-1/2': qDetailOpen || pDetailOpen,
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
                onChange={(_e, newValue) => {
                  setTabValue(newValue)
                  setQDetailOpen(undefined)
                  setPDetailOpen(undefined)
                }}
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
                  {questionsQuery.isLoading && questionSkeletons(4)}
                  {questionsQuery.error && <p>Error :(</p>}

                  {questionsQuery.isSuccess && questionsQuery.data && (
                    <>
                      {questionsQuery.data.length > 0 ? (
                        <div className="space-y-6">
                          {questionsQuery.data.map(q => (
                            <QuestionRow
                              key={q.id}
                              question={q}
                              detailOpen={!!qDetailOpen}
                              onDetailClick={() => setQDetailOpen(q)}
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

              {tabValue === PROJECTS && (
                <>
                  {projectsQuery.isLoading && projectSkeletons(4, 2)}
                  {projectsQuery.isError && <p>Error :(</p>}

                  {projectsQuery.isSuccess && projectsQuery.data && (
                    <>
                      {projectsQuery.data.length > 0 ? (
                        <div className="grid grid-cols-12 gap-6">
                          {projectsQuery.data.map(project => (
                            <div
                              key={project.id}
                              className={clsx({
                                'col-span-6': !pDetailOpen,
                                'col-span-12': pDetailOpen,
                              })}
                            >
                              <ProjectCard
                                project={project}
                                onDetailClick={proj => setPDetailOpen(proj)}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Text>(There are no projects to show)</Text>
                      )}
                    </>
                  )}
                </>
              )}
            </Paper>
          </div>
          <QuestionDetail
            question={qDetailOpen}
            onClose={() => setQDetailOpen(undefined)}
          />
          <ProjectDetail
            project={pDetailOpen}
            onClose={() => setPDetailOpen(undefined)}
          />
        </div>
      )}
    </Container>
  )
}
