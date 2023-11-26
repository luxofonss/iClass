/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import QuestionTypeIcon, { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import { Button, Col, Form, Input, Row } from 'antd'
import classNames from 'classnames/bind'
import { Plus, Trash } from 'lucide-react'

import type { FormListFieldData } from 'antd'
import { QuestionField } from '../../types/question'

import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import TextArea from 'antd/es/input/TextArea'
import styles from './QuestionAnswer.module.scss'

const cx = classNames.bind(styles)

const answerType = {
  'single-choice': 'choices',
  'multi-choice': 'choices',
  'short-answer': 'answers',
  'long-answer': 'answers'
}

export default function QuestionAnswer({
  type,
  field,
  questionKey
}: {
  type: TypeQuestion
  field: QuestionField | FormListFieldData
  questionKey?: number
}) {
  const [choiceList, setChoiceList] = useState<string[]>([])
  const [correctAnswerKey, setCorrectAnswerKey] = useState<number[]>([])
  const form = useFormInstance()

  function handleSelectCorrectAnswer(key: number) {
    let questions, choice
    const formValues = form.getFieldsValue()
    if (questionKey !== undefined) {
      questions = formValues.questions
      choice = questions[questionKey].questions[field.key].choices[key]
    } else {
      questions = formValues.questions
      choice = questions[field.key].choices[key]
    }

    if (type === 'single-choice') {
      if (questionKey !== undefined) Object.assign(questions[questionKey].questions[field.key], { answers: choice })
      else Object.assign(questions[field.key], { answers: choice })
      setCorrectAnswerKey([key])
    } else if (type === 'multi-choice') {
      if (questionKey !== undefined) {
        const currentAnswer = questions[questionKey].questions[field.key].answers
        const newAnswer = currentAnswer ? [...currentAnswer] : []
        const newKeys = [...correctAnswerKey]
        const index = newAnswer.indexOf(choice)
        if (index === -1) {
          newAnswer.push(choice)
          newKeys.push(key)
        } else {
          newAnswer.splice(index, 1)
          newKeys.splice(index, 1)
        }
        Object.assign(questions[questionKey].questions[field.key], { answers: newAnswer })
        setCorrectAnswerKey(newKeys)
      } else {
        const currentAnswer = questions[field.key].answers
        const newAnswer = currentAnswer ? [...currentAnswer] : []
        const newKeys = [...correctAnswerKey]
        const index = newAnswer.indexOf(choice)
        if (index === -1) {
          newAnswer.push(choice)
          newKeys.push(key)
        } else {
          newAnswer.splice(index, 1)
          newKeys.splice(index, 1)
        }
        Object.assign(questions[field.key], { answers: newAnswer })
        setCorrectAnswerKey(newKeys)
      }
    }
    form.setFieldsValue({ questions })
  }

  return (
    <div>
      <Form.List
        name={questionKey !== undefined ? [field.name, answerType[type]] : [field.name, field.key, answerType[type]]}
      >
        {(fields, { add, remove }) => {
          return (
            <div className={cx('wrapper')}>
              <Row gutter={24}>
                {fields.map((field, index) => (
                  <Col span={12} key={field.key}>
                    <div className={cx('item')}>
                      <QuestionTypeIcon
                        correct={
                          (type === 'single-choice' || type === 'multi-choice') && correctAnswerKey.includes(field.name)
                        }
                        onClick={() => {
                          handleSelectCorrectAnswer(field.name)
                        }}
                        type={type}
                      />
                      <Form.Item className={cx('input')} style={{ margin: 0 }} name={field.name}>
                        <TextArea
                          rows={1}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const newChoiceList = [...choiceList]
                            newChoiceList[index] = event.target.value
                            setChoiceList(newChoiceList)
                          }}
                        />
                      </Form.Item>
                      <Button
                        danger
                        icon={<Trash size={14} />}
                        className={cx('btn-remove')}
                        onClick={() => {
                          remove(index)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
              <Button
                icon={<Plus size={14} />}
                className={cx('btn-add')}
                onClick={() => {
                  add()
                }}
              >
                Add answer
              </Button>
            </div>
          )
        }}
      </Form.List>
      {(type === 'multi-choice' || type === 'single-choice') && (
        <div hidden className={cx('answer')}>
          <Form.Item
            name={questionKey !== undefined ? [field.name, 'answers'] : [field.name, field.key, 'answers']}
            label='Key'
          >
            <Input />
          </Form.Item>
        </div>
      )}
    </div>
  )
}
