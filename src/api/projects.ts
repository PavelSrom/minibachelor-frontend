import axios from 'axios'
import queryString from 'query-string'
import { ProjectFilters } from '../types'
import { ProjectDTO } from '../types/api'
import { NewProjectPayload } from '../types/payloads'
import { API_CONFIG } from './config'

export const getProjects = (filters: ProjectFilters): Promise<ProjectDTO[]> => {
  const query = queryString.stringify(filters, {
    skipNull: true,
    skipEmptyString: true,
  })

  return axios
    .get(`${API_CONFIG.BASE_URL}/projects?${query}`)
    .then(({ data }) => data)
}

export const uploadProject = (
  formData: NewProjectPayload
): Promise<ProjectDTO> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/projects`, formData)
    .then(({ data }) => data)

export const deleteProject = (id: string): Promise<unknown> =>
  axios.delete(`${API_CONFIG.BASE_URL}/projects/${id}`).then(({ data }) => data)
