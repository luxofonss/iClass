/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import ClassBlock from '../../components/ClassBlock'
import styles from './Classrooms.module.scss'
const cx = classNames.bind(styles)

export default function Classrooms() {
  return (
    <div className={cx('classrooms')}>
      <Link to='/classroom/new'>
        <Button type='primary'>Add new class</Button>
      </Link>
      <Row gutter={[24, 24]}>
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
          return (
            <Col key={index} span={6}>
              <ClassBlock />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
