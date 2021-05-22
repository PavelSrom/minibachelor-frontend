import axios from 'axios'
import { API_CONFIG } from './config'
import { QuestionDTO } from '../types/api'
import { NewQuestionPayload } from '../types/payloads'

export const getQuestions = (): Promise<QuestionDTO[]> =>
  axios.get(`${API_CONFIG.BASE_URL}/questions`).then(({ data }) => data)

export const postQuestion = (
  formData: NewQuestionPayload
): Promise<QuestionDTO> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/questions`, formData)
    .then(({ data }) => data)
