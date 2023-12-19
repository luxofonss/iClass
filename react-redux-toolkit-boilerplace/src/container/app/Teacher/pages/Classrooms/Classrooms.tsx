/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { courseApi } from '@app-data/service/course.service'
import { CourseViewSchema } from '@shared/schema/course.schema'
import { Col, Row, Typography } from 'antd'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ClassBlock from '../../components/ClassBlock'
import styles from './Classrooms.module.scss'
const cx = classNames.bind(styles)

export default function Classrooms() {
  const [getAllCreatedCourses, { data: courses, isLoading: isGettingCourses }] =
    courseApi.endpoints.getAllCreatedCourses.useLazyQuery()

  useEffect(() => {
    getAllCreatedCourses(null, false)
  }, [])

  console.log('courses:: ', courses, isGettingCourses)
  return (
    <div className={cx('classrooms')}>
      <div className={cx('add-btn')}>
        <Link className={cx('link')} to='/classroom/new'>
          <Plus />
          <Typography.Text strong>New class</Typography.Text>
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        {courses?.data?.map((course: CourseViewSchema) => {
          return (
            <Col key={course.id} span={6}>
              <ClassBlock data={course} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
