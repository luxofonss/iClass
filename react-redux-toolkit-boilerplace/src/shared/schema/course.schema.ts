export type CourseCreateSchema = {
  name: string
  description: string
  background_img: string
  start_date: string
  end_date: string
  price: number
  currency: string
  level: string
  subject_id: string
  grade?: number | string
  course_infos: CourseInfoSchema[]
  sections: SectionSchema[]
}

export type CourseViewSchema = {
  id: string
  name: string
  description: string
  background_img: string
  thumbnail: string | null
  code: string
  start_date: string
  end_date: string
  price: number
  currency: string
  level: string
  subject: {
    id: string
    name: string
  }
  teacher: {
    first_name: string
    last_name: string
    avatar?: string
  }
  grade: number | string
  course_infos?: CourseInfoSchema[]
  sections?: SectionSchema[]
}

export type SimpleCourseView = {
  id: string
  deleted_at: string
  created_at: string
  updated_at: string
  name: string
  description: string
  background_img: string
  start_date: string
  end_date: string
  price: number
  currency: string
  level: string
  is_verified: boolean
  subject_id: string
  grade: string
}

export type CourseInfoSchema = {
  type: string
  content: string
}

export type SectionSchema = {
  id?: string
  name: string
  description: string
  lectures: LectureSchema[]
}

export type LectureSchema = {
  id?: string
  name: string
  description: string
  video_url: string
}

export type SubjectSchema = {
  id: string
  name: string
  description: string
  thumbnail_url: string
  created_at: string
  updated_at: string
  deleted_at: string
}
