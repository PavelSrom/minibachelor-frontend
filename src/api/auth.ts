import axios from 'axios'
import { API_CONFIG } from './config'
import { UserDTO } from '../types/api'
import { RegisterPayload, LoginPayload } from '../types/payloads'

export const refreshToken = (): Promise<{ token: string }> =>
  axios.get(`${API_CONFIG.BASE_URL}/auth`).then(({ data }) => data)

export const getUserProfile = (): Promise<UserDTO> =>
  axios.get(`${API_CONFIG.BASE_URL}/auth/profile`).then(({ data }) => data)

export const registerUser = (
  formData: RegisterPayload
): Promise<{ token: string }> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/auth/register`, formData)
    .then(({ data }) => data)

export const loginUser = (formData: LoginPayload): Promise<{ token: string }> =>
  axios
    .post(`${API_CONFIG.BASE_URL}/auth/login`, formData)
    .then(({ data }) => data)

export const deleteUser = (): Promise<{ message: string }> =>
  axios.delete(`${API_CONFIG.BASE_URL}/auth`).then(({ data }) => data)
