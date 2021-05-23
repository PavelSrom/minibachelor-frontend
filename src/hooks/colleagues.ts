import { useQuery, UseQueryOptions } from 'react-query'
import { getColleagueDetail } from '../api/colleagues'
import { UserDTO } from '../types/api'

export const useColleagueDetail = (
  id: string,
  options?: UseQueryOptions<UserDTO>
) => useQuery(['userDetail', id], () => getColleagueDetail(id), options)
