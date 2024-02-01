/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Card, Col, Row, Typography } from 'antd'
import styles from './ExamBlock.module.scss'
const cx = classNames.bind(styles)

export default function ExamBlock() {
  return (
    <Card className={cx('exam-block')}>
      <div className={cx('heading')}>
        <div className={cx('banner')}>
          <img src='https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg' alt='banner' />
        </div>
        <div className={cx('info')}>
          <Typography.Title level={4}>Quick test IELTS</Typography.Title>
          <Typography.Text>Created by: Nguyen Van Quyen</Typography.Text>
        </div>
      </div>
      <Row className={cx('details')} gutter={12}>
        <Col span={12}>
          <Typography.Text>Max score: 10</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>Total submission: 20</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>Duration: 60 minutes</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>Number of questions: 20</Typography.Text>
        </Col>
      </Row>
      <div className={cx('footer')}>
        <Button>View detail</Button>
        <Button type='primary'>Start</Button>
      </div>
    </Card>
  )
}
