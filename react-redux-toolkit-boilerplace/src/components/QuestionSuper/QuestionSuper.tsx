/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from 'antd'
import classNames from 'classnames/bind'
import styles from './QuestionSuper.module.scss'

import SubQuestion from '@components/SubQuestion'
import { Trash } from 'lucide-react'
import { QuestionField } from '../../types/question'

const cx = classNames.bind(styles)

export default function QuestionSuper(props: { field: QuestionField }) {
  return (
    <div className={cx('question-super')}>
      <div className={cx('heading')}>
        {/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
        <Form.Item name={[props.field.name, props.field.key, 'title']} label={`Question ${props.field.key + 1}:`}>
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
        <Form.Item name={[props.field.name, props.field.key, 'image']} label='Image'>
          <Input type='file' />
        </Form.Item>
        <Form.Item name={[props.field.name, props.field.key, 'audio']} label='Audio'>
          <Input type='file' />
        </Form.Item>
      </div>
      <Form.List name={[props.field.name, props.field.key, 'questions']}>
        {(fields, action) => {
          return (
            <div className={cx('questions')}>
              {fields.map((field) => (
                <div key={field.key}>
                  <SubQuestion questionKey={props.field.key} field={field} action={action} />
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
