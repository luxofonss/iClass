/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import QuestionTypeIcon, { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import { QUESTION_INDEX } from '@shared/constants'
import { Button, Col, Form, Select } from 'antd'
import classNames from 'classnames/bind'
import { Plus, Trash } from 'lucide-react'

import type { FormListFieldData } from 'antd'
import { QuestionField } from '../../types/question'

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
  field
}: {
  type: TypeQuestion
  field: QuestionField | FormListFieldData
}) {
  const [answerList, setAnswerList] = useState<string[]>([])
  console.log('test', type, field)
  return (
    <div>
      <Form.List name={[field.name, field.key, answerType[type]]}>
        {(fields, { add, remove }) => {
          return (
            <div className={cx('wrapper')}>
              {fields.map((field, index) => (
                <Col span={24} key={field.key}>
                  <div className={cx('item')}>
                    <QuestionTypeIcon type={type} />
                    <Form.Item
                      className={cx('input')}
                      style={{ margin: 0 }}
                      name={field.name}
                      label={QUESTION_INDEX[index]}
                    >
                      <TextArea
                        rows={1}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                          const newAnswerList = [...answerList]
                          newAnswerList[index] = event.target.value
                          setAnswerList(newAnswerList)
                        }}
                      />
                    </Form.Item>
                    <Button
                      danger
                      icon={<Trash size={16} />}
                      className={cx('btn-remove')}
                      onClick={() => {
                        remove(index)
                      }}
                    />
                  </div>
                </Col>
              ))}
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
        <div className={cx('answer')}>
          <Form.Item name={[field.name, field.key, 'answers']} label='Key'>
            <Select
              mode={type === 'multi-choice' ? 'multiple' : undefined}
              options={answerList?.map((choice: string, index: number) => {
                return { label: QUESTION_INDEX[index], value: choice }
              })}
            />
          </Form.Item>
        </div>
      )}
    </div>
  )
}
