import classNames from 'classnames/bind'

import AddAssignment from '@container/app/Shared/components/AddAssignment'
import { Button, Col, Row } from 'antd'
import { ChevronLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import AssignmentBlockTeacher from '../../components/AssignmentBlockTeacher'
import styles from './Assignments.module.scss'
const cx = classNames.bind(styles)

export default function Assignments() {
  const [isAdding, setIsAdding] = useState(true)
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
        ) : (
          <Button
            onClick={() => {
              setIsAdding(true)
            }}
            icon={<Plus size={14} />}
          >
            New assignment
          </Button>
        )}
      </div>
      {isAdding ? (
        <AddAssignment />
      ) : (
        <Row className={cx('body')} gutter={[24, 24]}>
          <Col span={6}>
            <AssignmentBlockTeacher />
          </Col>
          <Col span={6}>
            <AssignmentBlockTeacher />
          </Col>
          <Col span={6}>
            <AssignmentBlockTeacher />
          </Col>
          <Col span={6}>
            <AssignmentBlockTeacher />
          </Col>
          <Col span={6}>
            <AssignmentBlockTeacher />
          </Col>
        </Row>
      )}
    </div>
  )
}
