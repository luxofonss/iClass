/* eslint-disable @typescript-eslint/no-explicit-any */
import { Circle, Square } from 'lucide-react'

export type TypeQuestion = 'single-choice' | 'multi-choice' | 'short-answer' | 'long-answer'

interface IQuestionTypeIcon {
  type: TypeQuestion
  onClick: () => void
  correct: boolean
}

export default function QuestionTypeIcon({ type, onClick, correct }: IQuestionTypeIcon) {
  switch (type) {
    case 'single-choice':
      return <Circle onClick={onClick} fill={correct ? 'green' : 'red'} color={correct ? 'green' : 'red'} />
    case 'multi-choice':
      return <Square onClick={onClick} fill={correct ? 'green' : 'red'} color={correct ? 'green' : 'red'} />
    case 'short-answer':
      return null
    case 'long-answer':
      return null
  }
}
