/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Typography } from 'antd'
import classNames from 'classnames/bind'
import { BookOpenCheck, BookText, Video } from 'lucide-react'
import styles from './LectureBlock.module.scss'
const cx = classNames.bind(styles)

export default function LectureBlock() {
  return (
    <div className={cx('lecture-block')}>
      <div className={cx('heading')}>
        <Typography.Title level={5} ellipsis={{ rows: 2 }} className={cx('title')}>
          Bài 1: Thì hiện tại đơn, quá khứ đơn
        </Typography.Title>
        <Typography.Text className={cx('description')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.
        </Typography.Text>
      </div>
      <div className={cx('info')}>
        <div className={cx('item')}>
          <Video color={'#8C72FA'} size={14} /> <div>1</div>
        </div>
        <Divider type='vertical' />
        <div className={cx('item')}>
          <BookText color='#9BDAF5' size={14} /> <div>1</div>
        </div>
        <Divider type='vertical' />
        <div className={cx('item')}>
          <BookOpenCheck color='#C5B9FD' size={14} /> <div>5</div>
        </div>
      </div>
    </div>
  )
}
