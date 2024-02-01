/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { courseApi } from '@app-data/service/course.service'
import AddAssignment from '@container/app/Shared/components/AddAssignment'
import { ROLE } from '@shared/constants'
import { Button, Col, Row } from 'antd'
import { ChevronLeft, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AssignmentBlock from '../../components/AssignmentBlockTeacher'
import styles from './Assignments.module.scss'
const cx = classNames.bind(styles)

interface IAssignmentsProps {
  readonly mode: string
}

export default function Assignments({ mode }: IAssignmentsProps) {
  const [isAdding, setIsAdding] = useState(false)

  const [getAssignmentsInCourse, { data: assignments }] = courseApi.endpoints.getAssignmentsInCourse.useLazyQuery()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (getAssignmentsInCourse) {
      getAssignmentsInCourse(id, false)
    }
  }, [id])

  return (
    <div className={cx('assignments')}>
      <div className={cx('heading')}>
        {isAdding ? (
          <Button
            icon={<ChevronLeft size={14} />}
            onClick={() => {
              setIsAdding(false)
            }}
          >
            Back
          </Button>
        ) : mode === ROLE.TEACHER ? (
          <Button
            onClick={() => {
              setIsAdding(true)
            }}
            icon={<Plus size={14} />}
          >
            New assignment
          </Button>
        ) : null}
      </div>
      {isAdding ? (
        <AddAssignment
          backAllAssignment={() => {
            setIsAdding(false)
          }}
        />
      ) : (
        <Row className={cx('body')} gutter={[24, 24]}>
          {assignments?.data?.map((assignment: any) => {
            return (
              <Col span={6} key={assignment.id}>
                <AssignmentBlock mode={mode} data={assignment} />
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}
