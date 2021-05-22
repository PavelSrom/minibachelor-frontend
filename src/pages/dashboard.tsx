import { useState } from 'react'
import { Container } from '@material-ui/core'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import ContactSupport from '@material-ui/icons/ContactSupport'
import PostAdd from '@material-ui/icons/PostAdd'

const actions: { icon: JSX.Element; tooltip: string }[] = [
  { icon: <ContactSupport />, tooltip: 'Ask question' },
  { icon: <PostAdd />, tooltip: 'Upload project' },
]

export const Dashboard: React.FC = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false)

  return (
    <Container maxWidth="lg">
      <SpeedDial
        ariaLabel="SpeedDial example"
        className="fixed bottom-4 right-4"
        icon={<SpeedDialIcon />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}
        direction="up"
      >
        {actions.map(({ icon, tooltip }) => (
          <SpeedDialAction
            key={tooltip}
            icon={icon}
            tooltipTitle={tooltip}
            onClick={() => setSpeedDialOpen(false)}
          />
        ))}
      </SpeedDial>
    </Container>
  )
}
