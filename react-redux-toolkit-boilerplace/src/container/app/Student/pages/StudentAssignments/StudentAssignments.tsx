/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from '@app-data/service/assignment.service'
import { courseApi } from '@app-data/service/course.service'
import AssignmentBlockTeacher from '@container/app/Teacher/components/AssignmentBlockTeacher'
import { AssignmentViewSchema } from '@shared/schema/assignment.schema'
import formatTimeString from '@shared/utils/formatTimeString'
import { Button, Col, Row, Tabs, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import classNames from 'classnames/bind'
import { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './StudentAssignments.module.scss'

const cx = classNames.bind(styles)

interface IAssignmentsProps {
  readonly mode: string
}

interface DataType {
  id: string
  created_at: string
  deleted_at: string
  updated_at: string
  user_id: string
  assignment_id: string
  assignment_time_millis: string
  point: number
  teacher_comment: string
  finished_at: string
  assignment: AssignmentViewSchema
}

export default function StudentAssignments({ mode }: IAssignmentsProps) {
  const [getAssignmentsInCourse, { data: assignments }] = courseApi.endpoints.getAssignmentsInCourse.useLazyQuery()
  const [getAllAssignmentAttemptInCourse, { data: allAssignmentAttempt }] =
    assignmentApi.endpoints.getAllAssignmentAttemptInCourse.useLazyQuery()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    getAssignmentsInCourse(id, false)
    getAllAssignmentAttemptInCourse({ course_id: id as string }, false)
  }, [id])

  const onChange = (key: string) => {
    console.log(key)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'assignment',
      key: 'title',
      render: (_, { assignment }) => <Typography.Paragraph>{assignment.title}</Typography.Paragraph>
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'created_at',
      render: (_, { created_at }) => {
        return formatTimeString(created_at)
      }
    },
    {
      title: 'Điểm',
      dataIndex: 'point',
      key: 'point'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Fragment>
            {record?.assignment?.multiple_attempts && (
              <a href={`/student/assignment/${record.assignment_id}`}>Làm lại</a>
            )}
            <Link to={`/courses/${id}/assignments/attempt-review/${record?.id}`}>
              <Button>Xem chi tiết</Button>
            </Link>
          </Fragment>
        )
      }
    }
  ]

  return (
    <div className={cx('assignments')}>
      <Tabs defaultActiveKey='1' onChange={onChange}>
        <Tabs.TabPane tab='Assignments' key='assignments'>
          <Row className={cx('body')} gutter={[24, 24]}>
            {assignments?.data?.map((assignment: any) => {
              return (
                <Col span={6} key={assignment.id}>
                  <AssignmentBlockTeacher mode={mode} data={assignment} />
                </Col>
              )
            })}
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Attempted assignments' key='attempted-assignments'>
          {allAssignmentAttempt && (
            <Table pagination={false} columns={columns} dataSource={allAssignmentAttempt?.data} />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
