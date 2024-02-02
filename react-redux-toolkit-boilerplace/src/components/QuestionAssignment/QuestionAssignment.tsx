/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { assignmentApi } from '@app-data/service/assignment.service'
import { EditorWithCommentSystem } from '@components/Tiptap/EditorWithCommentSystem'
import { Button, Checkbox, Form, Image, Input, Radio, Tag, Typography } from 'antd'
import { Fragment, useState } from 'react'
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
  const [scoreLongAnswer, { isLoading: isScoring }] = assignmentApi.endpoints.scoreLongAnswer.useMutation()

  const [form] = Form.useForm()
  const { attemptId } = useParams()

  async function handleSubmitAnswer(values: any) {
    try {
      await submitAnswer({
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

  function checkAnswer() {
    if (data?.type === 'multi_choice' || data?.type === 'single_choice') {
      // return data?.answer[0]?.selected_option_id === form.getFieldValue('answer')
      const isRight =
        data?.choices?.find((choice: any) => choice?.is_correct)?.id === data?.answer[0]?.selected_option_id

      if (isRight) {
        return data?.point
      } else {
        return 0
      }
    }

    if (data?.type === 'short_answer') {
      // return data?.answer[0]?.text_answer === form.getFieldValue('answer')
      const isRight = data?.choices?.find((choice: any) => choice?.content === data?.answer[0]?.text_answer)
      if (isRight) {
        return data?.point
      } else {
        return 0
      }
    }

    if (data?.type === 'long_answer') {
      return data?.answer[0]?.score || 0
    }

    return 0
  }

  async function handleScoreLongAnswer() {
    if (data?.answer?.length > 0)
      try {
        await scoreLongAnswer({
          assignment_attempt_id: attemptId as string,
          answer_id: data.answer[0]?.id,
          score: form.getFieldValue('score')
        }).unwrap()

        toast.success('Scored successfully!')
      } catch (error: any) {
        toast.error(error?.data?.message || 'Something went wrong!')
      }
    else {
      toast.error('This question does not have answer!')
    }
  }

  return (
    <div className={cx('question-assignment')}>
      <Form form={form} onFinish={handleSubmitAnswer}>
        <Typography.Text>
          <strong>Question {order + 1}:</strong>{' '}
          {mode === 'RESULT' && (
            <Tag color={checkAnswer() === 0 ? 'red' : 'green'}>
              {checkAnswer()}/{data?.point}
            </Tag>
          )}
          <div dangerouslySetInnerHTML={{ __html: data?.title }} />
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
            initialValue={
              data?.answer?.length > 0 ? data?.answer[0]?.selected_option_id : data?.answer?.selected_option_id
            }
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
            initialValue={
              data?.answer?.length > 0 ? data?.answer[0]?.selected_option_id : data?.answer?.selected_option_id
            }
          >
            <Radio.Group className={cx('choices')}>
              {data?.choices?.map((choice: any, index: number) => (
                <Radio
                  style={choice?.is_correct ? { backgroundColor: '#e4ffdf' } : {}}
                  className={cx('choice-item')}
                  key={index}
                  value={choice?.id}
                >
                  <div dangerouslySetInnerHTML={{ __html: choice?.content }} />
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        {data?.type === 'short_answer' && (
          <Form.Item
            rules={[{ required: true }]}
            name='answer'
            initialValue={data?.answer?.length > 0 ? data?.answer[0].text_answer : data?.answer?.text_answer}
          >
            {data?.answer?.length > 0 ? (
              <div>
                <div>
                  Submitted answer: <strong>{data?.answer[0].text_answer}</strong>
                </div>
                <div>
                  Correct answers:{' '}
                  <ul>
                    {data?.choices?.map((item: any) => (
                      <li key={item.content}>
                        <strong>{item.content}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              data?.answer?.text_answer && (
                <div>
                  Your answer: <strong>{data?.answer?.text_answer}</strong>
                </div>
              )
            )}
            {mode === 'ATTEMPT' && <Input />}
          </Form.Item>
        )}
        {data?.type === 'long_answer' && (
          <Fragment>
            {mode === 'RESULT' && (
              <div>
                <Form.Item name='score' initialValue={data?.point} normalize={(v) => parseInt(v)}>
                  <Input type='number' />
                </Form.Item>
                <Button
                  loading={isScoring}
                  type='primary'
                  onClick={() => {
                    handleScoreLongAnswer()
                  }}
                >
                  Send
                </Button>
              </div>
            )}
            <Form.Item
              rules={[{ required: true }]}
              name='answer'
              initialValue={data?.answer?.length > 0 ? data?.answer[0].text_answer : data?.answer?.text_answer}
            >
              <EditorWithCommentSystem
                onValueChange={(v) => {
                  console.log('v:: ', v)
                  form.setFieldValue('answer', v)
                }}
                value={data?.answer?.length > 0 ? data?.answer[0].text_answer : data?.answer?.text_answer}
                comment={mode === 'ATTEMPT' ? false : true}
                answerId={data?.answer?.length > 0 ? data?.answer[0].id : null}
                assignmentAttemptId={attemptId}
                feedbacks={data?.answer?.length > 0 ? data?.answer[0].feedback : null}
                questionId={data?.id}
              />
            </Form.Item>
          </Fragment>
        )}
        {mode === 'ATTEMPT' && (
          <Button
            style={{ backgroundColor: submittedAnswer ? 'green' : 'orange' }}
            htmlType='submit'
            loading={isSubmitting}
          // type='primary'
          >
            Submit
          </Button>
        )}
      </Form>
    </div>
  )
}
