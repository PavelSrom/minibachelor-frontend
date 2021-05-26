import axios from 'axios'
import { API_CONFIG } from './config'
import { UserDTO } from '../types/api'
import { RegisterPayload, LoginPayload } from '../types/payloads'

export const getUserProfile = (email: string): Promise<UserDTO> =>
  axios
    .get(`${API_CONFIG.BASE_URL}/accounts/?email=${email}`)
    .then(({ data }) => data[0])

export const registerUser = (formData: RegisterPayload): Promise<UserDTO> => {
  return axios
    .post(`${API_CONFIG.BASE_URL}/accounts/`, {
      ...formData,
      username: `${formData.name} ${formData.surname}`,
    })
    .then(({ data }) => data)
}

export const loginUser = (
  formData: LoginPayload
): Promise<{ refresh: string; access: string }> =>
  axios.post(`${API_CONFIG.BASE_URL}/auth/`, formData).then(({ data }) => data)

export const deleteUser = (id: number): Promise<void> =>
  axios
    .delete(`${API_CONFIG.BASE_URL}/accounts/${id}/`)
    .then(({ data }) => data)
