import axios from 'axios'
import queryString from 'query-string'
import { UserFilters } from '../types'
import { UserDTO } from '../types/api'
import { API_CONFIG } from './config'

export const getColleagues = (filters: UserFilters): Promise<UserDTO[]> => {
  const query = queryString.stringify(filters, {
    skipNull: true,
    skipEmptyString: true,
  })

  return axios
    .get(`${API_CONFIG.BASE_URL}/accounts/?${query}`)
    .then(({ data }) => data)
}

export const getColleagueDetail = (id: number): Promise<UserDTO> =>
  axios
    .get(`${API_CONFIG.BASE_URL}/accounts/?id=${id}`)
    .then(({ data }) => data[0])
