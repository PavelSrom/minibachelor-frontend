import { useState } from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import PostAdd from '@material-ui/icons/PostAdd'

export const Projects: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div>
      <Tooltip title="Upload project" placement="left">
        <Fab
          color="secondary"
          className="fixed bottom-4 right-4"
          onClick={() => setModalOpen(true)}
        >
          <PostAdd />
        </Fab>
      </Tooltip>
    </div>
  )
}
