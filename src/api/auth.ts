import axios from 'axios'
import { UserDTO } from '../types/api'
import { RegisterPayload, LoginPayload } from '../types/payloads'

export const refreshToken = (): Promise<{ token: string }> =>
  axios.get('/auth').then(({ data }) => data)

export const getUserProfile = (): Promise<UserDTO> =>
  axios.get('/auth/profile').then(({ data }) => data)

export const registerUser = (
  formData: RegisterPayload
): Promise<{ token: string }> =>
  axios.post('/auth/register', formData).then(({ data }) => data)

export const loginUser = (formData: LoginPayload): Promise<{ token: string }> =>
  axios.post('/auth/login', formData).then(({ data }) => data)

export const deleteUser = (): Promise<{ message: string }> =>
  axios.delete('/auth').then(({ data }) => data)
