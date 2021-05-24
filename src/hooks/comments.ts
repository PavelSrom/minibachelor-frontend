import { useSnackbar } from 'notistack'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { deleteComment, getComments, postComment } from '../api/comments'
import { CommentDTO } from '../types/api'

export const useComments = (
  entityId: string,
  options?: UseQueryOptions<CommentDTO[]>
) => useQuery(['comments', entityId], () => getComments(entityId), options)

export const useNewComment = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(postComment, {
    onSuccess: () => {
      enqueueSnackbar('Comment added', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Cannot add comment', { variant: 'error' })
    },
    onSettled: (_data, _error, { entityId }) => {
      queryClient.invalidateQueries(['comments', entityId])
    },
  })
}

export const useDeleteComment = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteComment, {
    onSuccess: () => {
      enqueueSnackbar('Comment deleted', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Cannot delete comment', { variant: 'error' })
    },
    onSettled: (_data, _error, { entityId }) => {
      queryClient.invalidateQueries(['comments', entityId])
    },
  })
}