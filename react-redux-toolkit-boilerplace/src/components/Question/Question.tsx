import { Button, Form, Input, Select } from 'antd'
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './Question.module.scss'

import QuestionAnswer from '@components/QuestionAnswer'
import { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import { QUESTION_TYPE } from '@shared/constants'
import TextArea from 'antd/es/input/TextArea'
import { Trash } from 'lucide-react'
import { QuestionField } from '../../types/question'

const cx = classNames.bind(styles)

export default function Question({ field }: { field: QuestionField }) {
  const [type, setType] = useState<TypeQuestion>('single-choice')

  const onSelectType = (value: TypeQuestion) => {
    setType(value)
  }

  return (
    <div className={cx('question')}>
      <div className={cx('heading')}>
        {/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
        <Form.Item className={cx('title')} name={[field.name, field.key, 'title']} label={`Question ${field.key + 1}:`}>
          <TextArea rows={2} placeholder='Enter question' />
        </Form.Item>
        <Form.Item name={[field.name, field.key, 'type']} initialValue={'single-choice'}>
          <Select
            className={cx('type')}
            defaultValue='single-choice'
            options={QUESTION_TYPE}
            onSelect={(value) => onSelectType(value as TypeQuestion)}
          />
        </Form.Item>
        <Button
          icon={<Trash size={14} />}
          className={cx('btn-remove')}
          onClick={() => {
            // action.remove(field.name)
          }}
          danger
        />
      </div>
      <div className={cx('options')}>
        <Form.Item name={[field.name, field.key, 'point']} label='Point'>
          <Input />
        </Form.Item>
        <Form.Item name={[field.name, field.key, 'image']} label='Image'>
          <Input type='file' />
        </Form.Item>
        <Form.Item name={[field.name, field.key, 'audio']} label='Audio'>
          <Input type='file' />
        </Form.Item>
      </div>
      <div className={cx('answer')}>
        <QuestionAnswer field={field} type={type} />
      </div>
    </div>
  )
}
