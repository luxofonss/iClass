/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShopFilled } from '@ant-design/icons'
import { Avatar, Button, Col, Collapse, Divider, Row, Typography } from 'antd'
import classNames from 'classnames/bind'
import { BookAIcon, BookCheck, Plus } from 'lucide-react'

import { courseApi } from '@app-data/service/course.service'
import SectionBlock from '@components/SectionBlock'
import { COURSE_INFO_TYPES } from '@shared/constants'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureBlock from '../../components/LectureBlock'
import styles from './CourseDetailIntro.module.scss'
const cx = classNames.bind(styles)

export default function CourseDetailIntro() {
  const [getCourse, { data: course }] = courseApi.endpoints.getCourseById.useLazyQuery()

  const { id } = useParams()

  useEffect(() => {
    if (id) getCourse({ id })
  }, [])

  function getTotalLecture(): number {
    let total = 0
    course?.data?.sections?.forEach((section: any) => {
      total += section?.lectures?.length
    })
    return total
  }

  function getTotalSection(): number {
    return course?.data?.sections?.length ?? 0
  }

  return (
    <div className={cx('course-detail', 'container')}>
      <Row gutter={24}>
        <Col className={cx('left-section')} span={16}>
          <div className={cx('heading')}>
            <div
              className={cx('banner')}
              style={{
                backgroundImage: `url("${course?.data?.background_img}")`
              }}
            >
              <Avatar className={cx('teacher')} size={160} src={course?.data?.thumbnail} />
            </div>
            <div className={cx('info')}>
              <Typography.Title level={3} className={cx('name')}>
                {course?.data?.name}
              </Typography.Title>
              <Typography.Text className={cx('author')}>
                Created by:{' '}
                <Link to='/'> {course?.data?.teacher?.first_name + ' ' + course?.data?.teacher?.last_name}</Link>
              </Typography.Text>
              <Typography.Title level={5}>Description:</Typography.Title>
              <Typography.Paragraph className={cx('description')}>{course?.data?.description}</Typography.Paragraph>
            </div>
          </div>
          <div className={cx('course-info')}>
            <Typography.Title level={5} className={cx('title')}>
              What you&apos;ll learn from this course
            </Typography.Title>
            {course?.data?.course_infos
              ?.filter((item: any) => item.type === COURSE_INFO_TYPES.INTEND.type)
              ?.map((item: any) => <div key={item.content}>{item.content}</div>)}

            {/* Requirements  */}
            <Typography.Title level={5} className={cx('title')}>
              What are requirements of this course
            </Typography.Title>
            {course?.data?.course_infos
              ?.filter((item: any) => item.type === COURSE_INFO_TYPES.REQUIREMENT.type)
              ?.map((item: any) => <div key={item.content}>{item.content}</div>)}
          </div>
          <div className={cx('course-info')}>
            <Typography.Title level={5} className={cx('title')}>
              Curriculum
            </Typography.Title>
            <Collapse defaultActiveKey={['1']}>
              {course?.data?.sections?.map((section: any, index: number) => (
                <Collapse.Panel header={<SectionBlock data={section} index={index} />} key={section.id}>
                  {section?.lectures?.map((lecture: any) => <LectureBlock data={lecture} key={lecture.id} />)}
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </Col>
        <Col span={8}>
          <div className={cx('right-section')}>
            <div className={cx('info-block')}>
              <Typography.Title level={5} className={cx('title')}>
                Class information
              </Typography.Title>
              <div className={cx('item')}>
                <Typography.Text className={cx('label')}>Subject:</Typography.Text>
                <Typography.Text className={cx('value')}>{course?.data?.subject?.name}</Typography.Text>
              </div>
              <div className={cx('item')}>
                <Typography.Text className={cx('label')}>Level:</Typography.Text>
                <Typography.Text className={cx('value')}>{course?.data?.level}</Typography.Text>
              </div>
              <div className={cx('item')}>
                <Typography.Text className={cx('label')}>Teacher:</Typography.Text>
                <Typography.Text className={cx('value')}>
                  {course?.data?.teacher?.first_name + ' ' + course?.data?.teacher?.last_name}
                </Typography.Text>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={cx('info-block')}>
              <Typography.Title level={5} className={cx('title')}>
                Who is this course for?
              </Typography.Title>

              {course?.data?.course_infos
                ?.filter((item: any) => item.type === COURSE_INFO_TYPES.WHO.type)
                ?.map((item: any) => <div key={item.content}>{item.content}</div>)}
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={cx('info-block')}>
              <Typography.Title level={5} className={cx('title')}>
                Class summary
              </Typography.Title>
              <div className={cx('item')}>
                <BookAIcon size={16} />
                <Typography.Text>{getTotalSection()} sections</Typography.Text>
              </div>
              <div className={cx('item')}>
                <BookCheck size={16} />
                <Typography.Text>{getTotalLecture()} lectures</Typography.Text>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={cx('footer')}>
              <Typography.Text className={cx('price')}>
                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(course?.data?.price)}
              </Typography.Text>
              <div className={cx('btns')}>
                <Button size='large' icon={<Plus size={16} />} block>
                  Add to cart
                </Button>

                <Button size='large' icon={<ShopFilled size={16} />} type='primary' block>
                  Enroll now
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
