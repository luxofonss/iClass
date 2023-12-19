import { Content } from 'antd/es/layout/layout'
import { Outlet, useParams } from 'react-router-dom'

import { courseApi } from '@app-data/service/course.service'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import ClassLayoutSider from '../components/ClassLayoutSider'
import styles from './ClassLayout.module.scss'

const cx = classNames.bind(styles)

function ClassLayout() {
  const [getCourse, { data: course }] = courseApi.endpoints.getCourseById.useLazyQuery()

  const { id } = useParams()

  useEffect(() => {
    if (id) getCourse({ id })
  }, [])

  return (
    <div className={cx('class-layout')}>
      <ClassLayoutSider data={course?.data} siderCollapsed={false} />
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          background: '#F2F2F2'
        }}
        className={cx('content')}
      >
        {/* <div className={cx('heading')}>
          <div className={cx('title')}>
            <Home /> Home page
          </div>
          <div>
            <Expand
              onClick={() => {
                setSiderCollapsed(!siderCollapsed)
              }}
            />
          </div>
        </div> */}
        <div className={cx('outlet')}>
          <Outlet />
        </div>
      </Content>
    </div>
  )
}

export default ClassLayout
