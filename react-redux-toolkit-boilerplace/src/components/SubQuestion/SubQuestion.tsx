import QuestionAnswer from '@components/QuestionAnswer'
import { QUESTION_TYPE } from '@shared/constants'
import { Button, Form, Input, Select } from 'antd'
import classNames from 'classnames/bind'
import { Trash } from 'lucide-react'
import { useState } from 'react'

import styles from './SubQuestion.module.scss'

import { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import type { FormListFieldData, FormListOperation } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const cx = classNames.bind(styles)

interface ISubQuestion {
  field: FormListFieldData
  action: FormListOperation
  questionKey: number
}

export default function SubQuestion({ field, action, questionKey }: ISubQuestion) {
  const [type, setType] = useState<string>('single-choice')

  const onSelectType = (value: string) => {
    setType(value)
  }

  return (
    <div className={cx('question')}>
      <div className={cx('heading')}>
        {/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
        <Form.Item className={cx('title')} name={[field.name, 'title']} label={`Question ${field.key + 1}:`}>
          <TextArea rows={2} placeholder='Enter question' />
        </Form.Item>
        <Form.Item name={[field.name, 'type']} initialValue={'single-choice'}>
          <Select className={cx('type')} defaultValue='single-choice' options={QUESTION_TYPE} onSelect={onSelectType} />
        </Form.Item>
        <Button
          icon={<Trash size={14} />}
          className={cx('btn-remove')}
          onClick={() => {
            action.remove(field.key)
          }}
          danger
        />
      </div>
      <div className={cx('options')}>
        <Form.Item name={[field.name, 'point']} label='Point'>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, 'image']} label='Image'>
          <Input type='file' />
        </Form.Item>
        <Form.Item name={[field.name, 'audio']} label='Audio'>
          <Input type='file' />
        </Form.Item>
      </div>
      <div className={cx('answer')}>
        <QuestionAnswer questionKey={questionKey} field={field} type={type as TypeQuestion} />
      </div>
    </div>
  )
}
