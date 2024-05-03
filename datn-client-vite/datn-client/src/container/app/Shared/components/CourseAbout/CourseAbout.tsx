/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './CourseAbout.module.scss'
import { courseApi } from '@/app-data/service/course.service';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row, Typography } from 'antd';
import { CourseInfoSchema } from '@/shared/schema/course.schema';
import { CheckCheckIcon, Dot } from 'lucide-react';
const cx = classNames.bind(styles)

export default function CourseAbout() {

  const [getCourse, { data: course }] =
    courseApi.endpoints.getCourseById.useLazyQuery();

  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) getCourse({ id: courseId });
  }, []);

  console.log("course:: ", course);

  return <div className={cx('wrapper')}>
    <section>
      <Typography.Title level={3}>{course?.data?.name}</Typography.Title>
      <Typography.Paragraph>{course?.data?.description}</Typography.Paragraph>
      <Typography.Text>Created by: {course?.data?.teacher?.firstName + " " + course?.data?.teacher?.lastName}</Typography.Text>

    </section>
    <section>
      <div className={cx('info-heading')}>Ai sẽ cần khóa học này</div>
      <Row gutter={24}>
        {course?.data?.courseInfos?.map((info: CourseInfoSchema) => {
          if (info?.type === 'WHO')
            return <Col key={info?.id} span={24}>
              <div className={cx('info-item')}>
                <Dot size={14} />
                <div>{info?.content}</div>
              </div></Col>
          else return null
        })}
      </Row>
    </section>

    <section>
      <div className={cx('info-heading')}>Bạn sẽ học được gì</div>
      <Row gutter={24}>
        {course?.data?.courseInfos?.map((info: CourseInfoSchema) => {
          if (info?.type === 'INTEND')
            return <Col key={info?.id} span={12}>
              <div className={cx('info-item')}>
                <CheckCheckIcon size={14} />
                <div>{info?.content}</div>
              </div></Col>
          else return null
        })}
      </Row>
    </section>

    <section>
      <div className={cx('info-heading')}>Yêu cầu</div>
      <Row gutter={24}>
        {course?.data?.courseInfos?.map((info: CourseInfoSchema) => {
          if (info?.type === 'REQUIREMENT')
            return <Col key={info?.id} span={24}>
              <div className={cx('info-item')}>
                <Dot size={14} />
                <div>{info?.content}</div>
              </div></Col>
          else return null
        })}
      </Row>
    </section>



  </div>
}
