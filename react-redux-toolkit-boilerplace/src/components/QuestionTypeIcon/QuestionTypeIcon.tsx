/* eslint-disable @typescript-eslint/no-explicit-any */
import { QUESTION_TYPE_ENUM } from '@shared/constants'
import { Circle, Square } from 'lucide-react'

export type TypeQuestion = 'single_choice' | 'multi_choice' | 'short_answer' | 'long_answer'

interface IQuestionTypeIcon {
  type: TypeQuestion
  onClick: () => void
  correct: boolean
}

export default function QuestionTypeIcon({ type, onClick, correct }: IQuestionTypeIcon) {
  switch (type) {
    case QUESTION_TYPE_ENUM.SINGLE_CHOICE:
      return <Circle onClick={onClick} fill={correct ? 'green' : 'red'} color={correct ? 'green' : 'red'} />
    case QUESTION_TYPE_ENUM.MULTI_CHOICE:
      return <Square onClick={onClick} fill={correct ? 'green' : 'red'} color={correct ? 'green' : 'red'} />
    case QUESTION_TYPE_ENUM.SHORT_ANSWER:
      return null
    case QUESTION_TYPE_ENUM.LONG_ANSWER:
      return null
  }
}
