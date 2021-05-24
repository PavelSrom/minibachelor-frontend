import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import format from 'date-fns/format'
import clsx from 'clsx'
import {
  Grow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@material-ui/core'
import Link from '@material-ui/icons/Link'
import Delete from '@material-ui/icons/Delete'
import Close from '@material-ui/icons/Close'
import { useComments } from '../../hooks/comments'
import { ConfirmationDialog, Text } from '../../styleguide'
import { ProjectDTO } from '../../types/api'
import { CommentList } from '../comment-list'
import { useAuth } from '../../contexts/auth'
import { useDeleteProject } from '../../hooks/projects'

type Props = {
  project: ProjectDTO | undefined
  onClose: () => void
}

export const ProjectDetail: React.FC<Props> = ({ project, onClose }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const history = useHistory()
  const { user } = useAuth()

  const { mutateAsync: deleteProject, isLoading: isDeletingProject } =
    useDeleteProject()
  const commentsQuery = useComments(project?._id || '', {
    enabled: !!project?._id,
  })

  const notMyProject = user?._id !== project?.userId

  return (
    <Grow in={!!project}>
      <div
        className={clsx({
          // change classes here to fix quickview tooltip behavior
          'w-1/2 visible ml-8': !!project,
          'w-0 invisible': !project,
        })}
      >
        <Paper className="p-6 sticky top-20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex">
              <Avatar className="w-16 h-16" />
              <div className="ml-4">
                <Text variant="h2">{project?.title}</Text>
                <Text>
                  by{' '}
                  <span
                    className={clsx('font-semibold', {
                      'cursor-pointer': notMyProject,
                    })}
                    onClick={() =>
                      notMyProject
                        ? history.push(`/user/${project?.userId}`)
                        : null
                    }
                  >
                    {project?.userName} {project?.userSurname}
                  </span>
                </Text>
                {project?.createdAt && (
                  <Text variant="body2">
                    {format(new Date(project!.createdAt), 'dd.MM.yyyy, hh:MM')}
                  </Text>
                )}
                <div>
                  {project?.otherUrl && (
                    <Tooltip title="View details in a new tab">
                      <IconButton size="small" color="primary">
                        <a
                          href={project?.otherUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 flex items-center"
                        >
                          <Link />
                        </a>
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="View demo in a new tab">
                    <IconButton size="small" color="secondary">
                      <a
                        href={project?.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 flex items-center"
                      >
                        <Link />
                      </a>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="space-x-2">
              {project?.userId === user?._id && (
                <Tooltip title="Delete project">
                  <IconButton
                    size="small"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Close detail">
                <IconButton size="small" edge="end" onClick={onClose}>
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <Text>{project?.description ?? '(No description)'}</Text>

          <Text variant="h2" className="mt-8">
            Comments {commentsQuery.data && `(${commentsQuery.data.length})`}
          </Text>
          <Divider className="mt-2 mb-4" />
          {commentsQuery.isLoading && <p>Loading...</p>}
          {commentsQuery.isError && <p>Error :(</p>}

          {commentsQuery.isSuccess && commentsQuery.data && (
            <CommentList
              entityId={project!._id}
              comments={commentsQuery.data}
            />
          )}
        </Paper>

        <ConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() =>
            deleteProject(project!._id).then(() => {
              setDeleteDialogOpen(false)
              onClose()
            })
          }
          loading={isDeletingProject}
          confirmText="Delete"
        />
      </div>
    </Grow>
  )
}
