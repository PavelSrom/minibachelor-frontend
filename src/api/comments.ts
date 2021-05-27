import axios from 'axios'
import queryString from 'query-string'
import { CommentFilters } from '../types'
import { CommentDTO } from '../types/api'
import { NewCommentPayload } from '../types/payloads'
import { API_CONFIG } from './config'

export const getComments = (filters: CommentFilters): Promise<CommentDTO[]> => {
  const query = queryString.stringify(filters, {
    skipNull: true,
    skipEmptyString: true,
  })

  return axios
    .get(`${API_CONFIG.BASE_URL}/comments/?${query}`)
    .then(({ data }) => data)
}

export const postComment = ({
  filters,
  formData,
}: {
  filters: CommentFilters
  formData: NewCommentPayload & { user: number }
}): Promise<CommentDTO> => {
  const bodyToSend: any = { ...formData }
  if (filters.questionId) bodyToSend.questionId = filters.questionId
  if (filters.projectId) bodyToSend.projectId = filters.projectId

  return axios
    .post(`${API_CONFIG.BASE_URL}/comments/`, bodyToSend)
    .then(({ data }) => data)
}

export const deleteComment = (commentId: number): Promise<unknown> =>
  axios
    .delete(`${API_CONFIG.BASE_URL}/comments/${commentId}/`)
    .then(({ data }) => data)
