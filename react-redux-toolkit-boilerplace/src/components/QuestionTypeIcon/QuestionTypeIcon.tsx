/* eslint-disable @typescript-eslint/no-explicit-any */

import { Circle, Square } from 'lucide-react'

export type TypeQuestion = 'single-choice' | 'multi-choice' | 'short-answer' | 'long-answer'

interface IQuestionTypeIcon {
  type: TypeQuestion
}

export default function QuestionTypeIcon({ type }: IQuestionTypeIcon) {
  switch (type) {
    case 'single-choice':
      return <Circle />
    case 'multi-choice':
      return <Square />
    case 'short-answer':
      return null
    case 'long-answer':
      return null
  }
}
