/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Col, Row } from 'antd'
import LectureBlock from '../../components/LectureBlock'
import styles from './Lectures.module.scss'
const cx = classNames.bind(styles)

export default function Lectures() {
  return (
    <div className={cx('lectures')}>
      <div>
        <Button type='primary'>New lecture</Button>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <LectureBlock />
        </Col>
        <Col span={6}>
          <LectureBlock />
        </Col>
        <Col span={6}>
          <LectureBlock />
        </Col>
        <Col span={6}>
          <LectureBlock />
        </Col>
        <Col span={6}>
          <LectureBlock />
        </Col>
        <Col span={6}>
          <LectureBlock />
        </Col>
      </Row>
    </div>
  )
}
