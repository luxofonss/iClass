/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './AddAssignment.module.scss'
import Question from '@components/Question'
import { DatePicker, Button, Form, Input, Select, Row, Col } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { TIME_OPTIONS } from '@shared/constants'
import QuestionSuper from '@components/QuestionSuper'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'

const cx = classNames.bind(styles)
const { RangePicker } = DatePicker

type IQuestionType = 'question' | 'super-question'

interface ISortableItemProps {
  type: IQuestionType
  order: number
}

const SortableItem = SortableElement<ISortableItemProps>(({ type, order }: ISortableItemProps) => {
  console.log('type:: ', type, order)
  if (type === 'question') {
    return <Question field={{ key: order, name: 'questions' }} />
  } else if (type === 'super-question') {
    return <QuestionSuper field={{ key: order, name: 'questions' }} />
  }
})

interface ISortableListProps {
  items: IQuestionType[]
}

const SortableList = SortableContainer<ISortableListProps>(({ items }: ISortableListProps) => {
  console.log('items:: ', items)
  return (
    <ul>
      {items?.map((type, index) => {
        console.log(type, index)
        return <SortableItem key={`item-${type}-${index}`} index={index} order={index} type={type} />
      })}
    </ul>
  )
})

export default function AddAssignment() {
  const [timeType, setTimeType] = useState<string>('free')
  const [question, setQuestion] = useState<IQuestionType[]>([])

  const onTimeTypeChange = (value: string) => {
    setTimeType(value)
  }

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setQuestion(arrayMove(question, oldIndex, newIndex))
  }

  const onSubmit = (values: any) => {
    console.log('values:: ', values)
  }

  return (
    <div className={cx('add-assignment')}>
      <Form onFinish={onSubmit}>
        <div className={cx('assignment-info')}>
          <Form.Item className={cx('title')} name={'title'}>
            <Input style={{ fontWeight: 500 }} size='large' placeholder='Enter title' />
          </Form.Item>
          <Form.Item className={cx('description')} name={'New description'}>
            <TextArea placeholder='Enter description' />
          </Form.Item>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name='time' label='Time' initialValue={timeType}>
                <Select onChange={onTimeTypeChange} options={TIME_OPTIONS} />
              </Form.Item>
            </Col>
            {timeType === 'custom' && (
              <Col span={12}>
                <Form.Item name='custom-time' label='Custom time'>
                  <RangePicker showTime />
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>
        <div className={cx('questions')}>
          <SortableList items={question} onSortEnd={onSortEnd} />
        </div>
        <div className={cx('btn-action')}>
          <Button
            onClick={() => {
              setQuestion([...question, 'question'])
            }}
          >
            Add question
          </Button>
          <Button
            onClick={() => {
              setQuestion([...question, 'super-question'])
            }}
          >
            Add super question
          </Button>
        </div>
        <Button className={cx('btn-submit')} htmlType='submit' type='primary'>
          Submit
        </Button>
      </Form>
    </div>
  )
}