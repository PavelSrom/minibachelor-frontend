import axios from 'axios'
import { ProjectDTO } from '../types/api'
import { NewProjectPayload } from '../types/payloads'
import { API_CONFIG } from './config'

export const getProjects = (): Promise<ProjectDTO[]> =>
  axios.get(`${API_CONFIG.BASE_URL}/projects`).then(({ data }) => data)

export const uploadProject = (
  formData: NewProjectPayload
): Promise<ProjectDTO> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/projects`, formData)
    .then(({ data }) => data)

export const deleteProject = (id: string): Promise<unknown> =>
  axios.delete(`${API_CONFIG.BASE_URL}/projects/${id}`).then(({ data }) => data)
