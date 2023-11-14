/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './LectureBlock.module.scss'
import SimpleInfo from '@components/SimpleInfo'
const cx = classNames.bind(styles)

export default function LectureBlock() {
  return (
    <div className={cx('lecture-block')}>
      <div className={cx('heading')}>
        <p className={cx('title')}>Lecture 1: Introduction</p>
        <p className={cx('description')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.</p>
      </div>
      <div className={cx('info')}>
        <SimpleInfo label='Video' value='0' />
        <SimpleInfo label='Document' value='3' />
        <SimpleInfo label='Assignment' value='2' />
      </div>
    </div>
  )
}
