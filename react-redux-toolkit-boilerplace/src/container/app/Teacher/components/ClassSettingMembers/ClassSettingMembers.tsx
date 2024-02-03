/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { courseApi } from '@app-data/service/course.service'
import { Button, Modal, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import useModal from '../../../../../hooks/useModal'
import ModalAddUserToCourses from '../ModalAddUserToCourses'
import styles from './ClassSettingMembers.module.scss'

const cx = classNames.bind(styles)

interface DataType {
  id: string
  key: React.Key
  user_id: string
  course_id: string
  price: string
  student_id: string
  status: string
  created_at: string
  user: {
    id: string
    deleted_at: string
    created_at: string
    updated_at: string
    first_name: string
    last_name: string
    gender: string
    dob: string
    email: string
  }
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function ClassSettingMembers() {
  const { visible, openModal, closeModal } = useModal()
  const { id } = useParams()

  const [getAllEnrolledStudents, { data: enrollments }] = courseApi.endpoints.getAllEnrolledStudents.useLazyQuery()
  const [deleteEnrollment, { isLoading: isDisabling }] = courseApi.endpoints.deleteCourseEnrollment.useMutation()
  const [enableEnrollment, { isLoading: isEnabling }] = courseApi.endpoints.enableCourseEnrollment.useMutation()
  const [getCourse, { data: course }] = courseApi.endpoints.getCourseById.useLazyQuery()

  useEffect(() => {
    if (id) getCourse({ id })
  }, [])

  useEffect(() => {
    if (id) getAllEnrolledStudents({ id: id })
  }, [])

  function getCourseStudentHandler() {
    if (id) getAllEnrolledStudents({ id: id })
  }
  async function handleDeleteEnrollment(id: string) {
    try {
      await deleteEnrollment({ id: id }).unwrap()
      toast.success('Disable user successfully')
      getCourseStudentHandler()
    } catch (error) {
      toast.error('Disable user failed')
      console.log(error)
    }
  }

  async function handleEnableEnrollment(id: string) {
    try {
      await enableEnrollment({ id: id }).unwrap()
      toast.success('Enable user successfully')
      getCourseStudentHandler()
    } catch (error) {
      toast.error('Enable user failed')
      console.log(error)
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      key: 'fullName',
      render: (_, { user }) => {
        return `${user?.last_name} ${user?.first_name}`
      }
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, { user }) => {
        return `${user?.email}`
      }
    },
    {
      title: 'Số báo danh',
      dataIndex: 'student_id',
      sorter: {
        compare: (a, b) => a.student_id.localeCompare(b.student_id),
        multiple: 3
      }
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      sorter: {
        compare: (a, b) => a.user.gender.localeCompare(b.user.gender),
        multiple: 3
      },
      render: (_, { user }) => {
        return user?.gender
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      sorter: {
        compare: (a, b) => a.user?.dob.localeCompare(b.user?.dob),
        multiple: 2
      },
      render: (_, { user }) => {
        return user?.dob
      }
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'enrollDate',
      sorter: {
        compare: (a, b) => a.created_at.localeCompare(b.created_at),
        multiple: 2
      },
      render: (_, { user }) => {
        return user?.created_at?.slice(0, 19)
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
        if (record?.status === 'ACTIVE')
          return (
            <Space>
              <Button
                loading={isDisabling}
                onClick={() => {
                  handleDeleteEnrollment(record?.id)
                }}
                danger
              >
                Disable
              </Button>
            </Space>
          )
        else
          return (
            <Space>
              <Button
                loading={isEnabling}
                onClick={() => {
                  handleEnableEnrollment(record?.id)
                }}
              >
                Enable
              </Button>
            </Space>
          )
      }
    }
  ]
  return (
    <div className={cx('class-setting-member')}>
      <div className={cx('options')}>
        <ModalAddUserToCourses />
        <Button onClick={openModal}>Get course code</Button>
        <Modal title='Get course code' open={visible} onCancel={closeModal} onOk={closeModal}>
          <Typography.Title level={3}>{course?.data?.code}</Typography.Title>
        </Modal>
      </div>
      {enrollments?.data && (
        <Table pagination={false} columns={columns} dataSource={enrollments?.data} onChange={onChange} />
      )}
    </div>
  )
}
