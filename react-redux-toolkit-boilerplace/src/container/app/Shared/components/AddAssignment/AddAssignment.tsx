/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { useState } from 'react'

import Question from '@components/Question'
import QuestionSuper from '@components/QuestionSuper'
import { SimpleEditor } from '@components/Tiptap'
import { TIME_OPTIONS } from '@shared/constants'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { GripVertical } from 'lucide-react'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import styles from './AddAssignment.module.scss'

const cx = classNames.bind(styles)
const { RangePicker } = DatePicker

type IQuestionType = 'question' | 'super-question'

const DragHandle = SortableHandle(() => (
  <Button className={cx('grip-btn')}>
    <GripVertical size={14} />
  </Button>
))

interface ISortableItemProps {
  type: IQuestionType
  order: number
}

const SortableItem = SortableElement<ISortableItemProps>(({ type, order }: ISortableItemProps) => {
  console.log('type:: ', type, order)
  if (type === 'question') {
    return <Question dragHandler={<DragHandle />} field={{ key: order, name: 'questions' }} />
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

  const [form] = Form.useForm()

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
      <Form layout='vertical' form={form} onFinish={onSubmit}>
        <div className={cx('assignment-info')}>
          <Form.Item style={{ marginBottom: '0px !important' }} className={cx('title')} name={'title'} label='Title'>
            {/* <Input style={{ fontWeight: 500 }} size='large' placeholder='Enter title' /> */}
            <SimpleEditor
              onValueChange={(value) => {
                form.setFieldValue('title', value)
              }}
              placeholder='Enter assignment title'
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '0px !important' }}
            className={cx('description')}
            name={'New description'}
            label='Description'
          >
            {/* <TextArea placeholder='Enter description' /> */}
            <SimpleEditor
              onValueChange={(value) => {
                form.setFieldValue('description', value)
              }}
              placeholder='Enter assignment description'
            />
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
            <Col span={6}>
              <Form.Item name='scope' label='Scope'>
                <Select onChange={onTimeTypeChange} options={TIME_OPTIONS} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={cx('questions')}>
          <SortableList useDragHandle items={question} onSortEnd={onSortEnd} />
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
