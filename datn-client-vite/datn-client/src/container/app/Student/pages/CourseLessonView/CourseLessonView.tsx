/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './CourseLessonView.module.scss'
import { courseApi } from '@/app-data/service/course.service';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Collapse, Table, Tag } from 'antd';
import { LectureSchema, SectionSchema } from '@/shared/schema/course.schema';
import { BookCheck, CheckCheckIcon, PencilIcon, PlayCircle, Video } from 'lucide-react';
const cx = classNames.bind(styles)

export default function CourseLessonView() {

  const [getCourse, { data: course }] =
    courseApi.endpoints.getCourseById.useLazyQuery();

  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) getCourse({ id: courseId });
  }, []);

  console.log("course:: ", course);

  return <div className={cx('wrapper')}>
    <Collapse defaultActiveKey={['1']}>
      {course?.data?.sections?.map((section: SectionSchema) =>
        <Collapse.Panel key={section?.id} header={<div className={cx('heading')}>{section?.name}</div>}>
          {section?.lessons?.map((lesson: LectureSchema) => <div className={cx('section')} key={lesson?.id}>
            {lesson?.type === 'VIDEO' && <div className={cx('lesson')}>
              <div className={cx('left')}>
                <Video size={14} />
                <div>{lesson?.name}</div>
              </div>
              <div className={cx('right')}>
                <Tag color='green'>Đã hoàn thành</Tag>
                <Link to={`/courses/${courseId}/lessons/${lesson?.id}`}> <PlayCircle className={cx('play')} size={14} /></Link>
              </div>
            </div>}

            {lesson?.type === 'ASSIGNMENT' && <div className={cx('lesson')}>
              <div className={cx('left')}>
                <BookCheck size={14} />
                <div>{lesson?.name}</div>
              </div>
              <div className={cx('right')}>
                <Tag color='green'>Đã hoàn thành</Tag>
                <Link to={`/courses/${courseId}/lessons/${lesson?.id}`}> <PencilIcon className={cx('play')} size={14} /></Link>
              </div>
            </div>}
          </div>)}
        </Collapse.Panel>)}
    </Collapse>
  </div>
}
