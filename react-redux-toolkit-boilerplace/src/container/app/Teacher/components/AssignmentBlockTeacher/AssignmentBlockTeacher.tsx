/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import SimpleInfo from '@components/SimpleInfo'
import { Col, Divider, Row, Tag, Typography } from 'antd'
import styles from './AssignmentBlockTeacher.module.scss'
const cx = classNames.bind(styles)

export default function AssignmentBlockTeacher() {
  return (
    <div className={cx('assignment-block')}>
      <div className={cx('heading')}>
        <Typography.Title level={4} className={cx('title')}>
          Exam 01
        </Typography.Title>
        <Typography.Text>Lesson 1: Get started with English</Typography.Text>
      </div>
      <Divider />
      <div className={cx('info')}>
        <Row gutter={12}>
          <Col span={24}>
            <SimpleInfo label='Ngày tạo' value='27/10/2023 12:12' />
          </Col>
          <Col span={24}>
            <SimpleInfo label='Thời hạn' value='27/10/2023 14:00' />
          </Col>
          <Col span={12}>
            <Tag color='blue'>Trung bình</Tag>
          </Col>
          <Col span={12}>
            <Tag color='green'>14/23 hoàn thành</Tag>
          </Col>
        </Row>
      </div>
    </div>
  )
}
