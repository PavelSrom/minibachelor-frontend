import { useSnackbar } from 'notistack'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { deleteProject, getProjects, uploadProject } from '../api/projects'
import { ProjectFilters } from '../types'
import { ProjectDTO } from '../types/api'

export const useProjects = (
  filters: ProjectFilters,
  options?: UseQueryOptions<ProjectDTO[]>
) =>
  useQuery(
    ['projects', filters.programme, filters.school, filters.user],
    () => getProjects(filters),
    options
  )

export const useNewProject = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(uploadProject, {
    onSuccess: () => {
      enqueueSnackbar('Project uploaded', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Cannot upload project', { variant: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries('projects')
    },
  })
}

export const useDeleteProject = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteProject, {
    onSuccess: () => {
      enqueueSnackbar('Project deleted', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Cannot delete project', { variant: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries('projects')
    },
  })
}
