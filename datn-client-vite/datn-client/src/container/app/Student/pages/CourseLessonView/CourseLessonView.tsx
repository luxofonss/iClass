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
            <div className={cx('lesson')}>
              <div className={cx('left')}>
                {lesson?.type === 'VIDEO' && <Video size={14} />}
                {lesson?.type === 'ASSIGNMENT' && <PencilIcon className={cx('play')} size={14} />}
                <div>{lesson?.name}</div>
              </div>
              <div className={cx('right')}>
                {lesson?.lessonStudent?.status === 'DONE' && <Tag className={cx('tag', 'done')} color='#A3F5C1'>Đã hoàn thành</Tag>}
                {lesson?.lessonStudent?.status === 'DOING' && <Tag className={cx('tag', 'doing')} color='#FFF4CC'>Đang học</Tag>}
                {lesson?.lessonStudent === null && <Tag className={cx('tag')} color='#EFF0F0'>Chưa học</Tag>}
                <Link to={`/courses/${courseId}/lessons/${lesson?.id}`}> <PlayCircle className={cx('play')} size={14} /></Link>
              </div>
            </div>
          </div>)}
        </Collapse.Panel>)}
    </Collapse>
  </div>
}
