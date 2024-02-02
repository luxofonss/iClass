/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from '@app-data/service/assignment.service'
import ModalConfirm from '@components/ModalConfirm'
import { Col, Divider, Row, Typography } from 'antd'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import Countdown from 'react-countdown'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import QuestionAssignment from '../../../../../components/QuestionAssignment'
import styles from './AttemptAssignment.module.scss'

const cx = classNames.bind(styles)

export default function AttemptAssignment() {
  const [getAssignmentAttempt, { data: assignmentAttempt }] =
    assignmentApi.endpoints.getAssignmentAttempt.useLazyQuery()
  const { attemptId } = useParams()
  const [submitAssignment, { isLoading: isSubmitting }] = assignmentApi.endpoints.submitAssignment.useMutation()

  useEffect(() => {
    if (attemptId) {
      console.log('attemptId:: ', attemptId)
      getAssignmentAttempt(attemptId)
    }
  }, [attemptId])

  async function submitAssignmentHandler() {
    try {
      await submitAssignment({ assignment_attempt_id: attemptId as string }).unwrap()

      toast.success('Assignment submitted successfully!')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <div className={cx('attempt-assignment', 'container')}>
      <Row gutter={24}>
        <Col span={18}>
          <Typography.Title level={3}>{assignmentAttempt?.data?.assignment?.title}</Typography.Title>
          <Typography.Paragraph>{assignmentAttempt?.data?.assignment?.description}</Typography.Paragraph>
        </Col>
        <Col span={6}>
          <div>
            {assignmentAttempt?.data?.assignment_time_millis && (
              <Countdown
                renderer={(props) => (
                  <div style={{ fontSize: 24 }}>
                    {props.formatted.hours} : {props.formatted.minutes} : {props.formatted.seconds}
                  </div>
                )}
                date={Date.now() + assignmentAttempt?.data?.remaining_time}
              />
            )}
          </div>
          <ModalConfirm
            handleConfirm={() => {
              submitAssignmentHandler()
            }}
            isSubmitting={isSubmitting}
            modalMessage='Do you want to submit this assignment?'
            btnText='Submit assignment'
          />
        </Col>
      </Row>

      <Divider />

      {assignmentAttempt?.data?.assignment?.questions?.map((question: any, index: number) => (
        <QuestionAssignment key={index} data={question} order={index} mode='ATTEMPT' />
      ))}

      {/* <EditorWithCommentSystem
        onValueChange={(v) => {
          console.log('v:: ', v)
        }}
      /> */}
    </div>
  )
}
