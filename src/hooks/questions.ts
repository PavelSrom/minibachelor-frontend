import { useSnackbar } from 'notistack'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { getQuestions, postQuestion } from '../api/questions'
import { QuestionFilters } from '../types'
import { QuestionDTO } from '../types/api'

export const useQuestions = (
  filters: QuestionFilters,
  options?: UseQueryOptions<QuestionDTO[]>
) =>
  useQuery(
    ['questions', filters.school, filters.programme, filters.user],
    () => getQuestions(filters),
    options
  )

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
