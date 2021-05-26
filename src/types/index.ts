export type School =
  | 'University College of Northern Denmark'
  | 'Business Academy Aarhus'
  | 'VIA University College'
  | 'Business Academy South West'
  | 'Copenhagen School of Technology'
  | 'Copenhagen Business Academy'

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
  user?: string
  isPublic?: boolean | null // so that queryString can remove null
}

export type ProjectFilters = {
  school?: string
  programme?: string
  user?: string
}
