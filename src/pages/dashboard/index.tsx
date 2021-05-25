import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Paper, Tab, Tabs } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import ContactSupport from '@material-ui/icons/ContactSupport'
import PostAdd from '@material-ui/icons/PostAdd'
import { NewQuestionModal } from '../../components/new-question-modal'
import { NewProjectModal } from '../../components/new-project-modal'
import { tabs } from '../../utils/dashboard-tabs'
// tabs
import { MyClassmates } from './my-classmates'
import { MyTeachers } from './my-teachers'
import { MyQuestions } from './my-questions'
import { MyProjects } from './my-projects'

const INFO = 0
const SETTINGS = 1
const CLASSMATES = 2
const TEACHERS = 3
const QUESTIONS = 4
const PROJECTS = 5

export const Dashboard: React.FC = () => {
  const history = useHistory()
  const [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false)
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false)
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false)

  const [tabValue, setTabValue] = useState<number>(0)

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper className="mb-6">
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={(_e, newValue) => setTabValue(newValue)}
          indicatorColor="secondary"
          textColor="secondary"
        >
          {tabs.map(({ label, icon }, index) => (
            <Tab key={label} label={label} value={index} icon={icon} />
          ))}
        </Tabs>
      </Paper>

      {tabValue === INFO && null}
      {tabValue === SETTINGS && null}
      {tabValue === CLASSMATES && <MyClassmates />}
      {tabValue === TEACHERS && <MyTeachers />}
      {tabValue === QUESTIONS && <MyQuestions />}
      {tabValue === PROJECTS && <MyProjects />}

      <SpeedDial
        ariaLabel="SpeedDial"
        className="fixed bottom-4 right-4"
        FabProps={{ color: 'secondary' }}
        icon={<SpeedDialIcon className="text-white" />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}
        direction="up"
      >
        <SpeedDialAction
          icon={<ContactSupport />}
          tooltipTitle="Ask question"
          onClick={() => {
            setSpeedDialOpen(false)
            setQuestionModalOpen(true)
          }}
        />
        <SpeedDialAction
          icon={<PostAdd />}
          tooltipTitle="Upload project"
          onClick={() => {
            setSpeedDialOpen(false)
            setProjectModalOpen(true)
          }}
        />
      </SpeedDial>

      <NewQuestionModal
        open={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
        onCreated={() => history.push('/questions')}
      />
      <NewProjectModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onCreated={() => history.push('/projects')}
      />
    </Container>
  )
}
