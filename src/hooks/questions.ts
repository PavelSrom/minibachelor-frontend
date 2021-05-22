import { useSnackbar } from 'notistack'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { getQuestions, postQuestion } from '../api/questions'
import { QuestionDTO } from '../types/api'

export const useQuestions = (options?: UseQueryOptions<QuestionDTO[]>) =>
  useQuery('questions', getQuestions, options)

export const useNewQuestion = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(postQuestion, {
    onSuccess: () => {
      enqueueSnackbar('Question posted', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Cannot post question', { variant: 'error' })
    },
    onSettled: () => {
      queryClient.invalidateQueries('questions')
    },
  })
}
