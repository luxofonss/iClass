import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

import classNames from 'classnames/bind'
import ClassLayoutSider from '../components/ClassLayoutSider'
import styles from './ClassLayout.module.scss'

const cx = classNames.bind(styles)

function ClassLayout() {
  // const [siderCollapsed, setSiderCollapsed] = useState(false)

  return (
    <div className={cx('class-layout')}>
      <ClassLayoutSider siderCollapsed={false} />
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
