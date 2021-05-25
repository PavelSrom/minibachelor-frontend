import { useQuery, UseQueryOptions } from 'react-query'
import { getColleagueDetail, getColleagues } from '../api/colleagues'
import { UserDTO } from '../types/api'

export const useColleagues = (
  role: 'student' | 'teacher',
  options?: UseQueryOptions<UserDTO[]>
) => useQuery(['colleagues', role], () => getColleagues(role), options)

export const useColleagueDetail = (
  id: string,
  options?: UseQueryOptions<UserDTO>
) => useQuery(['userDetail', id], () => getColleagueDetail(id), options)
