import { Programme, School } from '.'

export type UserDTO = {
  _id: string
  name: string
  surname: string
  email: string
  role: 'student' | 'teacher'
  school: School
  programme: Programme
}

export type QuestionDTO = {
  _id: string
  userId: string
  userName: string
  userSurname: string
  school: School
  programme: Programme
  title: string
  description: string
  isPublic: boolean
  createdAt: string
}

export type ProjectDTO = {
  _id: string
  userId: string
  userName: string
  userSurname: string
  school: School
  programme: Programme
  title: string
  description?: string
  demoUrl: string
  otherUrl?: string
  createdAt: string
}

export type CommentDTO = {
  _id: string
  userId: string
  entityId: string
  userName: string
  userSurname: string
  text: string
  createdAt: string
}
