/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { useState } from 'react'

import { assignmentApi } from '@app-data/service/assignment.service'
import Question from '@components/Question'
import QuestionSuper from '@components/QuestionSuper'
import { SimpleEditor } from '@components/Tiptap'
import { ASSIGNMENT_ATTEMPT_TYPE, ASSIGNMENT_TYPE, TIME_OPTIONS } from '@shared/constants'
import { AssignmentCreateSchema, QuestionSchema } from '@shared/schema/assignment.schema'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { GripVertical } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import styles from './AddAssignment.module.scss'
import toast from 'react-hot-toast'

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
  return (
    <ul>
      {items?.map((type, index) => {
        return <SortableItem key={`item-${type}-${index}`} index={index} order={index} type={type} />
      })}
    </ul>
  )
})

export default function AddAssignment() {
  const [timeType, setTimeType] = useState<string>('free')
  const [question, setQuestion] = useState<IQuestionType[]>([])

  const [form] = Form.useForm()
  const { classroomId } = useParams()

  const [createAssignment] = assignmentApi.endpoints.createAssignment.useMutation()

  const onTimeTypeChange = (value: string) => {
    setTimeType(value)
  }

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setQuestion(arrayMove(question, oldIndex, newIndex))
  }

  const onSubmit = async (values: any) => {
    try {
      const data = { ...values }
      if (data.time === 'custom') {
        data.start_time = data.custom_time
        data.end_time = data.custom_time
      } else {
        data.start_time = null
        data.end_time = null
      }

      const body: AssignmentCreateSchema = {
        start_time: data.start_time,
        end_time: data.end_time,
        type: data.type,
        placement_id: classroomId ?? '',
        multiple_attempts: data.multiple_attempts,
        title: data.title,
        description: data.description,
        total_point: 10,
        subject_id: '39d6e7e7-1536-4bf3-aabe-194e57843324',
        questions: data.questions.map((question: any, index: number) => {
          const questionData: QuestionSchema = {
            title: question.title,
            image: question?.image,
            audio_url: question?.audio,
            type: question.type,
            level: question.level,
            subject_id: '39d6e7e7-1536-4bf3-aabe-194e57843324',
            order: index,
            point: parseInt(question.point, 10),
            choices: question.choices?.map((choice: any) => {
              return {
                content: choice.content,
                order: choice.order,
                is_correct: choice.is_correct
              }
            })
          }
          return questionData
        })
      }

      console.log('body:: ', body)

      await createAssignment(body).unwrap()

      toast.success('Create assignment successfully!')
    } catch (error: any) {
      console.log('error:: ', error)
    }
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
            name={'description'}
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

            <Col span={12}>
              <Form.Item hidden={timeType === 'free'} name='custom_time' label='Custom time'>
                <RangePicker showTime />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name='type' label='Assignment type'>
                <Select options={Object.values(ASSIGNMENT_TYPE)} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='multiple_attempts' label='Attempt type'>
                <Select options={Object.values(ASSIGNMENT_ATTEMPT_TYPE)} />
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
