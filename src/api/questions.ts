import axios from 'axios'
import queryString from 'query-string'
import { API_CONFIG } from './config'
import { QuestionFilters } from '../types'
import { QuestionDTO } from '../types/api'
import { NewQuestionPayload } from '../types/payloads'

export const getQuestions = (
  filters: QuestionFilters
): Promise<QuestionDTO[]> => {
  const query = queryString.stringify(filters, {
    skipNull: true,
    skipEmptyString: true,
  })

  return axios
    .get(`${API_CONFIG.BASE_URL}/questions?${query}`)
    .then(({ data }) => data)
}

export const postQuestion = (
  formData: NewQuestionPayload
): Promise<QuestionDTO> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/questions`, formData)
    .then(({ data }) => data)

export const deleteQuestion = (id: string): Promise<unknown> =>
  axios
    .delete(`${API_CONFIG.BASE_URL}/questions/${id}`)
    .then(({ data }) => data)
