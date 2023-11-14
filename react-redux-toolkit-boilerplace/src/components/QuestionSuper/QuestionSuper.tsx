/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from 'antd'
import classNames from 'classnames/bind'
import styles from './QuestionSuper.module.scss'

import SubQuestion from '@components/SubQuestion'
import { Trash } from 'lucide-react'
import { QuestionField } from '../../types/question'

const cx = classNames.bind(styles)

export default function QuestionSuper({ field }: { field: QuestionField }) {
  console.log('field:: ', field)
  return (
    <div className={cx('question-super')}>
      <div className={cx('heading')}>
        {/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
        <Form.Item name={[field.name, field.key, 'title']} label={`Question ${field.key + 1}:`}>
          <Input placeholder='Enter question' />
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
        <Form.Item name={[field.name, field.key, 'image']} label='Image'>
          <Input type='file' />
        </Form.Item>
        <Form.Item name={[field.name, field.key, 'audio']} label='Audio'>
          <Input type='file' />
        </Form.Item>
      </div>
      <Form.List name={[field.name, field.key, 'questions']}>
        {(fields, action) => {
          return (
            <div className={cx('questions')}>
              {fields.map((field) => (
                <div key={field.key}>
                  <SubQuestion field={field} action={action} />
                </div>
              ))}
              <Button
                className={cx('btn-add')}
                onClick={() => {
                  action.add()
                }}
              >
                Add question
              </Button>
            </div>
          )
        }}
      </Form.List>
    </div>
  )
}
