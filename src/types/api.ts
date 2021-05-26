import { Programme, School } from '.'

export type UserDTO = {
  id: number
  name: string
  surname: string
  username: string
  email: string
  role: 'student' | 'teacher'
  school: School
  programme: Programme
}

export type QuestionDTO = {
  id: number
  user: number
  userName: string
  userSurname: string
  school: School
  programme: Programme
  title: string
  description: string
  isPublic: boolean
  created_at: string
}

export type ProjectDTO = {
  id: number
  user: number
  userName: string
  userSurname: string
  school: School
  programme: Programme
  title: string
  description?: string
  demoUrl: string
  otherUrl?: string
  created_at: string
}

export type CommentDTO = {
  id: number
  user: number
  entityId: number
  userName: string
  userSurname: string
  comment: string
  created_at: string
}
