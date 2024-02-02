/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from '@app-data/service/assignment.service'
import formatTimeString from '@shared/utils/formatTimeString'
import { Button, Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './AllAssignmentAttempt.module.scss'

const cx = classNames.bind(styles)

interface DataType {
  id: string
  deleted_at: string | null
  created_at: string
  updated_at: string
  user_id: string
  assignment_id: string
  assignment_time_millis: number
  point: number
  teacher_comment: string
  finished_at: string
  assignment: null
  question_answer: null
  user: {
    id: string
    deleted_at: string | null
    created_at: string
    updated_at: string
    last_name: string
    first_name: string
    dob: string
    gender: string
  }
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function AllAssignmentAttempt() {
  const { assignmentId } = useParams()

  const [getAlAssignmentAttemptResults, { data: allAttempts }] =
    assignmentApi.endpoints.getAlAssignmentAttemptResults.useLazyQuery()

  useEffect(() => {
    if (assignmentId) {
      getAlAssignmentAttemptResults({ assignment_id: assignmentId })
    }
  }, [assignmentId])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      key: 'user',
      render: (_, { user }) => {
        return `${user?.last_name} ${user?.first_name}`
      }
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, { created_at }) => formatTimeString(created_at)
    },
    {
      title: 'Kết thúc',
      dataIndex: 'finished_at',
      key: 'finished_at',
      render: (_, { finished_at }) => formatTimeString(finished_at)
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'point',
      key: 'point'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Link to={`/teacher/courses/assignments/${record?.assignment_id}/attempts/${record?.id}`}>
            <Button type='primary'>Chấm lại</Button>
          </Link>
        )
      }
    }
  ]
  return (
    <div className={cx('class-setting-member')}>
      {allAttempts?.data && (
        <Table pagination={false} columns={columns} dataSource={allAttempts?.data} onChange={onChange} />
      )}
    </div>
  )
}
