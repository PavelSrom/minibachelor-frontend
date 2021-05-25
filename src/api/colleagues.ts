import axios from 'axios'
import { UserDTO } from '../types/api'
import { API_CONFIG } from './config'

export const getColleagues = (
  role: 'student' | 'teacher'
): Promise<UserDTO[]> =>
  axios
    .get(`${API_CONFIG.BASE_URL}/colleagues?role=${role}`)
    .then(({ data }) => data)

export const getColleagueDetail = (id: string): Promise<UserDTO> =>
  axios.get(`${API_CONFIG.BASE_URL}/colleagues/${id}`).then(({ data }) => data)
