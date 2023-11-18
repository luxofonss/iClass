/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Divider, Rate, Tag, Typography } from 'antd'
import { BookCopy } from 'lucide-react'
import styles from './ClassBlock.module.scss'
const cx = classNames.bind(styles)

export default function ClassBlock() {
  return (
    <div className={cx('class-block')}>
      <div className={cx('thumbnail')}>
        <img src={'https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg'} alt='thumbnail' />
      </div>
      <Divider />
      <div className={cx('info')}>
        <div className={cx('tags')}>
          <Tag color='lime'>English</Tag>
          <Tag color='cyan'>Advanced</Tag>
          <Tag color='geekblue'>Mrs.Test</Tag>
        </div>
        <Typography.Title level={4} className={cx('name')}>
          Khóa học tiếng anh trung hoc cơ bản lớp 10
        </Typography.Title>
        <div className={cx('info')}>
          <div className={cx('item')}>
            <div className={cx('label')}>
              4.5 (193 review) <Rate disabled defaultValue={4.5} />
            </div>
          </div>

          <div className={cx('item')}>
            <div className={cx('price')}>
              <Typography.Text className={cx('new')} strong>
                $199
              </Typography.Text>
              <Typography.Text className={cx('old')} delete>
                $249
              </Typography.Text>
            </div>
            <div className={cx('nums-lecture')}>
              <div className={cx('label')}>
                <BookCopy size={18} />
              </div>
              <div className={cx('value')}>15 lectures</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
