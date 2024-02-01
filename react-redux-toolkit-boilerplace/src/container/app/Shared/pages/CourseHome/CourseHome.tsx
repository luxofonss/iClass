import { courseApi } from '@app-data/service/course.service'
import ClassBlock from '@components/ClassBlock'
import { COURSE_VIEW_MODE } from '@shared/constants'
import { CourseViewSchema } from '@shared/schema/course.schema'
import { Col, Empty, Row } from 'antd'
import classNames from 'classnames/bind'
import styles from './CourseHome.module.scss'

const cx = classNames.bind(styles)

const CourseHome: React.FC = () => {
  const { data: allCourses } = courseApi.endpoints.getAllActiveCourses.useQuery(null)

  return (
    <div className={cx('course-home-wrapper', 'container')}>
      <Row gutter={[24, 24]}>
        {allCourses?.data?.length > 0 ? (
          allCourses.data.map((course: CourseViewSchema) => {
            return (
              <Col span={6} key={course.id}>
                <ClassBlock mode={COURSE_VIEW_MODE.NOT_ENROLLED} data={course} />
              </Col>
            )
          })
        ) : (
          <Empty />
        )}
      </Row>
    </div>
  )
}

export default CourseHome
