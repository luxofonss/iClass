export const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

export const ROLE = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER'
}

export const COURSE_VIEW_MODE = {
  TEACHER: 'TEACHER',
  NOT_ENROLLED: 'NOT_ENROLLED',
  ENROLLED: 'ENROLLED'
}

export const IMAGE =
  'https://images-platform.99static.com//VJULhRua27I6my6XqmWDTIUqCa4=/46x2045:959x2958/fit-in/500x500/99designs-contests-attachments/79/79121/attachment_79121110'

export const AVATAR = 'https://techcrunch.com/wp-content/uploads/2015/12/screen-shot-2013-06-26-at-5-04-13-pm.png'

export const AVATAR_2 =
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1698969600&semt=ais'

export const COLOR = {
  CORE: {
    BLUE: '#2A85FF',
    GREEN: '#83BF6E',
    RED: '#FF6A55',
    VIOLET: '#8E59FF'
  },
  SECONDARY: {
    ORANGE: '#FFBC99',
    VIOLET: '#CABDFF',
    BLUE: '#B1E5FC',
    GREEN: '#B5E4CA',
    YELLOW: '#FFD88D'
  }
}

export const QUESTION_TYPE_ENUM = {
  SINGLE_CHOICE: 'single_choice',
  MULTI_CHOICE: 'multi_choice',
  SHORT_ANSWER: 'short_answer',
  LONG_ANSWER: 'long_answer'
}

export const QUESTION_TYPE = [
  {
    value: QUESTION_TYPE_ENUM.SINGLE_CHOICE,
    label: 'Single choice'
  },
  {
    value: QUESTION_TYPE_ENUM.MULTI_CHOICE,
    label: 'Multi choice'
  },
  {
    value: QUESTION_TYPE_ENUM.SHORT_ANSWER,
    label: 'Short answer'
  },
  {
    value: QUESTION_TYPE_ENUM.LONG_ANSWER,
    label: 'Long answer'
  }
]

export const TIME_OPTIONS = [
  {
    value: 'free',
    label: 'Free'
  },
  {
    value: 'custom',
    label: 'Custom'
  }
]

export const QUESTION_INDEX = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T'
]

export const COURSE_LEVEL_OPS = [
  {
    label: 'Beginner',
    value: 'beginner'
  },
  {
    label: 'Elementary',
    value: 'elementary'
  },
  {
    label: 'Intermediate',
    value: 'intermediate'
  },
  {
    label: 'Upper-intermediate',
    value: 'upper intermediate'
  },
  {
    label: 'Advanced',
    value: 'advanced'
  },
  {
    label: 'Proficiency',
    value: 'proficiency'
  }
]

export const COURSE_INFO_TYPES = {
  INTEND: {
    type: 'intend',
    label: 'Intend'
  },
  REQUIREMENT: {
    type: 'requirement',
    label: 'Requirement'
  },
  WHO: {
    type: 'who',
    label: 'Who is this course for?'
  },
  WELCOME_MSG: {
    type: 'welcome_msg',
    label: 'Welcome message'
  },
  CONGRAT_MSG: {
    type: 'congrat_msg',
    label: 'Congratulation message'
  }
}

export const ASSIGNMENT_TYPE = {
  MID: {
    value: 'mid',
    label: 'Middle exam'
  },
  FINAL: {
    value: 'final',
    label: 'Final exam'
  },
  HOME_WORK: {
    value: 'home-work',
    label: 'Home work'
  },
  OTHER: {
    value: 'other',
    label: 'Other'
  }
}

export const ASSIGNMENT_ATTEMPT_TYPE = {
  SINGLE: {
    value: false,
    label: 'Single attempt'
  },
  MULTIPLE: {
    value: true,
    label: 'Multiple attempt'
  }
}

export const QUESTION_LEVEL = {
  EASY: {
    value: 'easy',
    label: 'Easy'
  },
  MEDIUM: {
    value: 'medium',
    label: 'Medium'
  },
  HARD: {
    value: 'hard',
    label: 'Hard'
  }
}
