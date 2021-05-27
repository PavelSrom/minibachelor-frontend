export type School =
  | 'University College of Northern Denmark'
  | 'Business Academy Aarhus'
  | 'VIA University College'
  | 'Business Academy South West'
  | 'Copenhagen School of Technology'
  | 'CPH Business Academy'

export type Programme =
  // IT + design
  | 'Web Development'
  | 'Digital Concept Development'
  | 'Computer Science'
  | 'Multimedia Design'
  // Construction & automation
  | 'Architectural Technology'
  | 'Automation Engineering'
  // Sales & marketing
  | 'International Sales & Marketing'
  | 'Marketing Management'
  // Sport & hospitality
  | 'Service & Hospitality'
  | 'Sport Management'

export type QuestionFilters = {
  school?: string
  programme?: string
  user?: number
  isPublic?: 'True' | null // so that queryString can remove null
}

export type ProjectFilters = {
  school?: string
  programme?: string
  user?: number
}

export type UserFilters = {
  role: 'student' | 'teacher'
  school?: string
  programme?: string
  id?: number
}

export type CommentFilters = {
  questionId?: number | null
  projectId?: number | null
}
