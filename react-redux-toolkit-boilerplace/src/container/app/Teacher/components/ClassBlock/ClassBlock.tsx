/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Divider, Rate } from 'antd'
import { BookCopy, School, User } from 'lucide-react'
import styles from './ClassBlock.module.scss'
const cx = classNames.bind(styles)

export default function ClassBlock() {
  return (
    <div className={cx('class-block')}>
      <div className={cx('thumbnail')}>
        <img src={'https://eiv.edu.vn/wp-content/uploads/2017/07/khoa-hoc-tieng-anh-giao-tiep.jpg'} alt='thumbnail' />
      </div>
      <Divider />
      <h2 className={cx('name')}>Khóa học tiếng anh ABC</h2>
      <div className={cx('info')}>
        <div className={cx('item')}>
          <div className={cx('label')}>
            4.5 <Rate disabled defaultValue={4.5} />
          </div>
        </div>
        <div className={cx('item')}>
          <div className={cx('label')}>
            <User size={18} />
            Số học họ viên:
          </div>
          <div className={cx('value')}>20</div>
        </div>
        <div className={cx('item')}>
          <div className={cx('label')}>
            <BookCopy size={18} />
            Số bài học:
          </div>
          <div className={cx('value')}>15</div>
        </div>
        <div className={cx('item')}>
          <div className={cx('label')}>
            <School size={18} />
            Lớp:
          </div>
          <div className={cx('value')}>12</div>
        </div>
      </div>
    </div>
  )
}
