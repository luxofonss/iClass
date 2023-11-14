/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './ClassSettingMembers.module.scss'
import { Button, Space, Table, Tag } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

const cx = classNames.bind(styles)

interface DataType {
  key: React.Key
  fullName: string
  studentId: string
  gender: string
  dob: string
  status: string
  enrollDate: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Họ và tên',
    dataIndex: 'fullName'
  },
  {
    title: 'Số báo danh',
    dataIndex: 'studentId',
    sorter: {
      compare: (a, b) => a.studentId.localeCompare(b.studentId),
      multiple: 3
    }
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    sorter: {
      compare: (a, b) => a.gender.localeCompare(b.gender),
      multiple: 3
    }
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dob',
    sorter: {
      compare: (a, b) => a.dob.localeCompare(b.dob),
      multiple: 2
    }
  },
  {
    title: 'Ngày tham gia',
    dataIndex: 'enrollDate',
    sorter: {
      compare: (a, b) => a.enrollDate.localeCompare(b.enrollDate),
      multiple: 2
    }
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color
      if (status === 'inactive') {
        color = 'volcano'
      } else {
        color = 'green'
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      console.log(record)
      return (
        <Space size='middle'>
          <Button danger>Delete</Button>
        </Space>
      )
    }
  }
]

const data: DataType[] = [
  {
    key: '1',
    fullName: 'Nguyễn Văn A',
    studentId: '20201234',
    gender: 'Nam',
    status: 'active',
    dob: '2014-12-24 23:12:00',
    enrollDate: '2014-12-24 23:12:00'
  },
  {
    key: '2',
    fullName: 'Nguyễn Văn B',
    studentId: '20201234',
    gender: 'Nam',
    status: 'active',
    dob: '2014-12-24 23:12:00',
    enrollDate: '2014-12-24 23:12:00'
  },
  {
    key: '3',
    fullName: 'Nguyễn Văn C',
    studentId: '20201234',
    gender: 'Nam',
    status: 'inactive',
    dob: '2014-12-24 23:12:00',
    enrollDate: '2014-12-24 23:12:00'
  },
  {
    key: '4',
    fullName: 'Nguyễn Văn D',
    studentId: '20201234',
    gender: 'Nam',
    status: 'active',
    dob: '2014-12-24 23:12:00',
    enrollDate: '2014-12-24 23:12:00'
  }
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function ClassSettingMembers() {
  return (
    <div className={cx('class-setting-member')}>
      <Table pagination={false} columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
