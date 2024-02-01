/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { assignmentApi } from '@app-data/service/assignment.service'
import { EditorWithCommentSystem } from '@components/Tiptap/EditorWithCommentSystem'
import { Button, Checkbox, Form, Image, Input, Radio, Typography } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import styles from './QuestionAssignment.module.scss'
const cx = classNames.bind(styles)

interface IQuestionAssignmentProps {
  data: any
  order: number
  mode?: string
}

export default function QuestionAssignment({ data, order, mode }: IQuestionAssignmentProps) {
  const [submittedAnswer, setSubmittedAnswer] = useState(data?.answer ? true : false)
  const [submitAnswer, { isLoading: isSubmitting }] = assignmentApi.endpoints.submitAnswer.useMutation()

  const [form] = Form.useForm()
  const { attemptId } = useParams()

  async function handleSubmitAnswer(values: any) {
    try {
      submitAnswer({
        assignment_attempt_id: attemptId as string,
        question_id: data.id,
        answer: {
          selected_option_id: data?.type === 'multi_choice' || data?.type === 'single_choice' ? values.answer : null,
          text_answer: data?.type === 'short_answer' || data?.type === 'long_answer' ? values.answer : ''
        }
      }).unwrap()

      setSubmittedAnswer(true)
    } catch (error: any) {
      console.log('error:: ', error)
      toast.error(error?.data?.message || 'Something went wrong!')
    }
  }

  console.log('submittedAnswer:: ', submittedAnswer)

  return (
    <div className={cx('question-assignment')}>
      <Form form={form} onFinish={handleSubmitAnswer}>
        <Typography.Text>
          <strong>Question {order + 1}:</strong> <div dangerouslySetInnerHTML={{ __html: data?.title }} />
        </Typography.Text>
        {data?.image?.url && <Image src={data?.image?.url} alt='question' />}
        {data?.audio_url && (
          <audio src={data?.audio_url} controls>
            <track kind='captions' />
          </audio>
        )}
        {data?.type === 'multi_choice' && (
          <Form.Item
            rules={[{ required: true }]}
            name='answer'
            valuePropName='value'
            initialValue={data?.answer?.selected_option_id}
          >
            <Checkbox.Group className={cx('choices')}>
              {data?.choices?.map((choice: any, index: number) => (
                <Checkbox className={cx('choice-item')} value={choice?.id} key={index}>
                  <div dangerouslySetInnerHTML={{ __html: choice?.content }} />
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        )}
        {data?.type === 'single_choice' && (
          <Form.Item
            rules={[{ required: true }]}
            name='answer'
            valuePropName='value'
            initialValue={data?.answer?.selected_option_id}
          >
            <Radio.Group className={cx('choices')}>
              {data?.choices?.map((choice: any, index: number) => (
                <Radio className={cx('choice-item')} key={index} value={choice?.id}>
                  <div dangerouslySetInnerHTML={{ __html: choice?.content }} />
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        {data?.type === 'short_answer' && (
          <Form.Item rules={[{ required: true }]} name='answer' initialValue={data?.answer?.text_answer}>
            {data?.answer?.text_answer && (
              <div>
                Your answer: <strong>{data?.answer?.text_answer}</strong>
              </div>
            )}
            <Input />
          </Form.Item>
        )}
        {data?.type === 'long_answer' && (
          <Form.Item rules={[{ required: true }]} name='answer' initialValue={data?.answer?.text_answer}>
            <EditorWithCommentSystem
              onValueChange={(v) => {
                console.log('v:: ', v)
                form.setFieldValue('answer', v)
              }}
              value={data?.answer?.text_answer}
              comment={mode === 'ATTEMPT' ? false : true}
            />
          </Form.Item>
        )}
        <Button
          style={{ backgroundColor: submittedAnswer ? 'green' : 'orange' }}
          htmlType='submit'
          loading={isSubmitting}
        // type='primary'
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
