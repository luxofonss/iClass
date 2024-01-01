import { ImageSchema } from './common.schema'

export type AssignmentCreateSchema = {
  start_time?: string
  end_time?: string
  type: string
  placement_id: string
  multiple_attempts: boolean
  title: string
  description: string
  total_point: number
  subject_id: string
  questions: QuestionSchema[]
}

export type QuestionSchema = {
  title: string
  image?: ImageSchema
  audio_url?: string
  type: string
  level: string
  subject_id: string
  order: number
  point: number
  choices: ChoiceSchema[]
}

export type ChoiceSchema = {
  content: string
  order: number
  is_correct: boolean
}
