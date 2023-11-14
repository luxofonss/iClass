/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './AssignmentBlockTeacher.module.scss'
import { Divider } from 'antd'
import SimpleInfo from '@components/SimpleInfo'
const cx = classNames.bind(styles)

export default function AssignmentBlockTeacher() {
  return (
    <div className={cx('assignment-block')}>
      <div className={cx('heading')}>
        <h1 className={cx('title')}>Exam 01</h1>
        <p>Lesson 1: Get started with English</p>
      </div>
      <Divider />
      <div className={cx('info')}>
        <SimpleInfo label='Ngày tạo' value='27/10/2023 12:12' />
        <SimpleInfo label='Thời hạn' value='27/10/2023 14:00' />
        <SimpleInfo label='Độ khó' value='Trung bình' />
        <SimpleInfo label='Hoàn thành' value='14/23' />
      </div>
    </div>
  )
}
