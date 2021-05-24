import { useState } from 'react'
import clsx from 'clsx'
import {
  Container,
  Fab,
  Tooltip,
  IconButton,
  InputBase,
  Paper,
  MenuItem,
  Divider,
  TextField,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import Search from '@material-ui/icons/Search'
import PostAdd from '@material-ui/icons/PostAdd'
import { Text } from '../styleguide'
import { NewProjectModal } from '../components/new-project-modal'
import { useProjects } from '../hooks/projects'
import { ProjectCard } from '../components/project-card'
import { ProjectDTO } from '../types/api'
import { ProjectDetail } from '../components/project-detail'

export const Projects: React.FC = () => {
  const [detailOpen, setDetailOpen] = useState<ProjectDTO | undefined>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('newest')

  const projectsQuery = useProjects()

  return (
    <Container maxWidth="lg" className="py-8">
      <Text variant="h1">People's projects</Text>
      <Text className="mt-2 mb-16">Lorem ipsum</Text>
      <div className="flex justify-between items-end">
        <Paper
          component="form"
          className="w-full max-w-md flex items-center p-1"
        >
          <IconButton>
            <Search />
          </IconButton>
          <InputBase className="ml-2 flex-1" placeholder="Search projects..." />
          <IconButton>
            <Close />
          </IconButton>
        </Paper>

        <div className="flex items-end space-x-4">
          <TextField
            size="small"
            variant="outlined"
            label="Sort by"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            select
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </TextField>
        </div>
      </div>
      <Divider className="mt-2 mb-8" />

      {projectsQuery.isLoading && <p>Loading...</p>}
      {projectsQuery.isError && <p>Error :(</p>}

      {projectsQuery.isSuccess && projectsQuery.data && (
        <div className="flex">
          <div
            className={clsx('transition-all duration-250', {
              'w-full': !detailOpen,
              'w-1/2': detailOpen,
            })}
          >
            {projectsQuery.data.length > 0 ? (
              <div className="grid grid-cols-12 gap-6">
                {projectsQuery.data.map(project => (
                  <div
                    key={project._id}
                    className={clsx({
                      'col-span-3': !detailOpen,
                      'col-span-6': detailOpen,
                    })}
                  >
                    <ProjectCard
                      project={project}
                      onDetailClick={proj => setDetailOpen(proj)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Text>(There are no projects)</Text>
            )}
          </div>

          <ProjectDetail
            project={detailOpen}
            onClose={() => setDetailOpen(undefined)}
          />
        </div>
      )}

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Tooltip title="Upload project" placement="left">
        <Fab
          color="secondary"
          className="fixed bottom-4 right-4 text-white"
          onClick={() => setModalOpen(true)}
        >
          <PostAdd />
        </Fab>
      </Tooltip>
    </Container>
  )
}
