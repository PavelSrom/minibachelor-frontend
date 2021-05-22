import axios from 'axios'
import { CommentDTO } from '../types/api'
import { NewCommentPayload } from '../types/payloads'
import { API_CONFIG } from './config'

export const getComments = (entityId: string): Promise<CommentDTO[]> =>
  axios
    .get(`${API_CONFIG.BASE_URL}/comments/${entityId}`)
    .then(({ data }) => data)

export const postComment = ({
  entityId,
  formData,
}: {
  entityId: string
  formData: NewCommentPayload
}): Promise<CommentDTO> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/comments/${entityId}`, formData)
    .then(({ data }) => data)

export const deleteComment = ({
  entityId,
  commentId,
}: {
  entityId: string
  commentId: string
}): Promise<unknown> =>
  axios
    .delete(`${API_CONFIG.BASE_URL}/comments/${entityId}/${commentId}`)
    .then(({ data }) => data)
