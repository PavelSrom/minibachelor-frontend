import { useQuery, UseQueryOptions } from 'react-query'
import { getQuestions } from '../api/questions'
import { QuestionDTO } from '../types/api'

export const useQuestions = (options?: UseQueryOptions<QuestionDTO[]>) =>
  useQuery('questions', getQuestions, options)
