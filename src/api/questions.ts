import axios from 'axios'
import { API_CONFIG } from './config'
import { QuestionDTO } from '../types/api'

export const getQuestions = (): Promise<QuestionDTO[]> =>
  axios.get(`${API_CONFIG.BASE_URL}/questions`).then(({ data }) => data)
