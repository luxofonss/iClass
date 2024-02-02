/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from '@app-data/service/assignment.service'
import QuestionAssignment from '@components/QuestionAssignment'
import { Divider, Typography } from 'antd'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import Countdown from 'react-countdown'
import { useParams } from 'react-router-dom'
import styles from './ViewAssignmentAttempt.module.scss'

const cx = classNames.bind(styles)

export default function ViewAssignmentAttempt() {
  const [getAssignmentAttemptDetail, { data: assignmentAttempt }] =
    assignmentApi.endpoints.getAssignmentAttemptDetail.useLazyQuery()
  const { attemptId } = useParams()

  useEffect(() => {
    if (attemptId) {
      console.log('attemptId:: ', attemptId)
      getAssignmentAttemptDetail({ assignment_attempt_id: attemptId })
    }
  }, [attemptId])

  console.log('assignmentAttempt:: ', assignmentAttempt?.data?.assignment_time_millis)

  return (
    <div className={cx('attempt-assignment', 'container')}>
      <Typography.Title level={3}>{assignmentAttempt?.data?.assignment?.title}</Typography.Title>
      <Typography.Paragraph>{assignmentAttempt?.data?.assignment?.description}</Typography.Paragraph>

      {assignmentAttempt?.data?.assignment_time_millis && (
        <Countdown date={Date.now() + assignmentAttempt?.data?.remaining_time} />
      )}
      <Divider />

      {assignmentAttempt?.data?.assignment?.questions?.map((question: any, index: number) => (
        <QuestionAssignment key={index} data={question} order={index} mode='RESULT' />
      ))}

      {/* <EditorWithCommentSystem
        onValueChange={(v) => {
          console.log('v:: ', v)
        }}
      /> */}
    </div>
  )
}
