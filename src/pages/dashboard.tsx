import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import ContactSupport from '@material-ui/icons/ContactSupport'
import PostAdd from '@material-ui/icons/PostAdd'
import { NewQuestionModal } from '../components/new-question-modal'
import { NewProjectModal } from '../components/new-project-modal'

export const Dashboard: React.FC = () => {
  const history = useHistory()
  const [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false)
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false)
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false)

  return (
    <Container maxWidth="lg">
      <SpeedDial
        ariaLabel="SpeedDial"
        className="fixed bottom-4 right-4"
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
