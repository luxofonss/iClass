/* eslint-disable @typescript-eslint/no-explicit-any */
export type LoginSchema = {
  email: string
  password: string
}

export type RegisterSchema = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
  gender: 'male' | 'female'
  dob: any
  auth_type: 'email' | 'google' | 'facebook'
  role: 'student' | 'teacher'
  learner_info?: {
    type: string
    grade: number
    school: string
  }
  teacher_info?: {
    biography: string
    edu_qualification: string
  }
}
