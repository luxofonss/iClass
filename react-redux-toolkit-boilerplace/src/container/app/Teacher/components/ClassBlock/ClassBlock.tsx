/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { CourseViewSchema } from '@shared/schema/course.schema'
import { Divider, Rate, Tag, Typography } from 'antd'
import { BookCopy } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './ClassBlock.module.scss'
const cx = classNames.bind(styles)

interface IClassBlockProps {
  data: CourseViewSchema
}

export default function ClassBlock({ data }: IClassBlockProps) {
  return (
    <div className={cx('class-block')}>
      <div className={cx('thumbnail')}>
        <img src={'https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg'} alt='thumbnail' />
      </div>
      <Divider />
      <div className={cx('info')}>
        <div className={cx('tags')}>
          <Tag color='lime'>{data?.subject?.name}</Tag>
          <Tag color='cyan'>{data?.level}</Tag>
          <Tag color='geekblue'>{data?.teacher?.last_name + ' ' + data?.teacher?.first_name}</Tag>
        </div>
        <Link to={`/classroom/${data?.id}/home`}>
          <Typography.Title level={5} className={cx('name')}>
            {data?.name}
          </Typography.Title>
        </Link>
        <div className={cx('info')}>
          <div className={cx('item')}>
            <div className={cx('label')}>
              4.5 (193 reviews) <Rate disabled defaultValue={4.5} />
            </div>
          </div>

          <div className={cx('item')}>
            <div className={cx('price')}>
              <Typography.Text className={cx('new')} strong>
                {data?.price}
              </Typography.Text>
              <Typography.Text className={cx('old')} delete>
                {data?.price}
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
