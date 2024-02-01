import { courseApi } from '@app-data/service/course.service'
import ClassBlock from '@components/ClassBlock'
import { CourseViewSchema } from '@shared/schema/course.schema'
import { Col, Row } from 'antd'
import classNames from 'classnames/bind'

import JoinCourseModel from '@container/app/Shared/components/JoinCourseModel'
import { COURSE_VIEW_MODE } from '@shared/constants'
import styles from './MyEnrolledCourses.module.scss'

const cx = classNames.bind(styles)

const MyEnrolledCourses: React.FC = () => {
  const { data: allCourses } = courseApi.endpoints.getMyEnrolledCourses.useQuery(null)

  console.log('allCourses:: ', allCourses)
  return (
    <div className={cx('join-course-wrapper', 'container')}>
      <div className={cx('join-btn')}>
        <JoinCourseModel />
      </div>
      <Row gutter={[24, 24]}>
        {allCourses?.data?.length > 0 &&
          allCourses.data.map((course: CourseViewSchema) => {
            return (
              <Col span={6} key={course.id}>
                <ClassBlock mode={COURSE_VIEW_MODE.ENROLLED} data={course} />
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default MyEnrolledCourses
