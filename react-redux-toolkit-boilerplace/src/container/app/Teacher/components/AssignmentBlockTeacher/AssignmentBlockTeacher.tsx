/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { assignmentApi } from '@app-data/service/assignment.service'
import SimpleInfo from '@components/SimpleInfo'
import { ROLE } from '@shared/constants'
import { AssignmentViewSchema } from '@shared/schema/assignment.schema'
import { Button, Col, Divider, Row, Tag, Typography } from 'antd'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styles from './AssignmentBlockTeacher.module.scss'
const cx = classNames.bind(styles)

interface IAssignmentBlockTeacherProps {
  readonly data: Partial<AssignmentViewSchema>
  readonly mode: string
}

export default function AssignmentBlockTeacher(props: IAssignmentBlockTeacherProps) {
  const { data, mode } = props

  const navigate = useNavigate()

  const [attemptAssignment] = assignmentApi.endpoints.attemptAssignment.useMutation()

  async function handleAttemptAssignment() {
    if (data?.id)
      try {
        const response = await attemptAssignment({ assignment_id: data?.id }).unwrap()
        console.log('response:: ', response)
        navigate(`/course/assignments/${data?.id}/${response?.data?.id}`)
      } catch (error: any) {
        toast.error(error?.data?.message || 'Something went wrong!')
      }
    else {
      toast.error('Something went wrong!')
    }
  }

  async function handleViewAttemptsByAssignment() {
    if (data?.id) {
      navigate(`/teacher/courses/assignments/${data?.id}/attempts`)
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className={cx('assignment-block')}>
      <div className={cx('heading')}>
        {/* <Link
          to={
            mode === ROLE.STUDENT ? `/course/assignments/${data?.id}` : `/teacher/courses/${id}/assignments/${data?.id}`
          }
        > */}
        <Typography.Title level={4} className={cx('title')}>
          {data?.title}
        </Typography.Title>
        {/* </Link> */}
        {/* <Typography.Text>{data?.description}</Typography.Text> */}
      </div>
      <Divider />
      <div className={cx('info')}>
        <Row gutter={12}>
          {data?.start_time && data?.end_time ? (
            <Fragment>
              <Col span={24}>
                <SimpleInfo label='Ngày bắt đầu' value={data?.start_time?.slice(0, 19).replace('T', ' ')} />
              </Col>
              <Col span={24}>
                <SimpleInfo label='Thời kết thúc' value={data?.end_time?.slice(0, 19).replace('T', ' ')} />
              </Col>
            </Fragment>
          ) : (
            <Col span={24}>
              <SimpleInfo label='Thời gian' value='Không giới hạn' />
            </Col>
          )}

          <Col span={24}>
            <SimpleInfo label='Độ khó' value={<Tag color='blue'>Trung bình</Tag>} />
          </Col>
          {/* <Col span={12}>
            <Tag color='green'>14/23 hoàn thành</Tag>
          </Col> */}
          {mode === ROLE.STUDENT && (
            <Col span={24}>
              <Button onClick={handleAttemptAssignment}>Attempt</Button>
            </Col>
          )}
          {mode === ROLE.TEACHER && (
            <Col span={24}>
              <Button onClick={handleViewAttemptsByAssignment}>View all attempts</Button>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}
