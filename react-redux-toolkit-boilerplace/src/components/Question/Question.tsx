import { Button, Form, Input, Select, Tag } from 'antd'
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './Question.module.scss'

import QuestionAnswer from '@components/QuestionAnswer'
import { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import { SimpleEditor } from '@components/Tiptap'
import { QUESTION_TYPE } from '@shared/constants'

import { Trash } from 'lucide-react'
import { QuestionField } from '../../types/question'

const cx = classNames.bind(styles)

interface IQuestion {
  field: QuestionField
  dragHandler: JSX.Element
}

export default function Question({ field, dragHandler }: IQuestion) {
  const [type, setType] = useState<TypeQuestion>('single-choice')

  const form = Form.useFormInstance()

  const onSelectType = (value: TypeQuestion) => {
    setType(value)
  }

  return (
    <div className={cx('question')}>
      <div className={cx('heading')}>
        {/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
        <div className={cx('info')}>
          {dragHandler}
          <Tag className={cx('title')} color='green'>
            Question {field.key + 1}
          </Tag>
          <Form.Item style={{ margin: 0 }} name={[field.name, field.key, 'type']} initialValue={'single-choice'}>
            <Select
              className={cx('type')}
              defaultValue='single-choice'
              options={QUESTION_TYPE}
              onSelect={(value) => onSelectType(value as TypeQuestion)}
            />
          </Form.Item>
          <Form.Item name={[field.name, field.key, 'point']}>
            <Input type='number' placeholder="Enter question's point " addonAfter='Point' />
          </Form.Item>
        </div>
        <Button
          icon={<Trash size={14} />}
          className={cx('btn-remove')}
          onClick={() => {
            // action.remove(field.name)
          }}
          danger
        />
      </div>
      <Form.Item name={[field.name, field.key, 'title']}>
        <SimpleEditor
          onValueChange={(value) => {
            form.setFieldValue('title', value)
          }}
          placeholder='Enter question'
        />
      </Form.Item>
      <div className={cx('options')}>
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
      <Form.Item name={[field.name, field.key, 'explain']} label='Explain the answer'>
        <SimpleEditor
          onValueChange={(value) => {
            form.setFieldValue('explain', value)
          }}
          placeholder='Explain the answer'
        />
      </Form.Item>
    </div>
  )
}
