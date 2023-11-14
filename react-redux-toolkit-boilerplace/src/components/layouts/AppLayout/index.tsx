/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom'

import { Layout, theme } from 'antd'
import classNames from 'classnames/bind'

import AppHeader from '../components/AppHeader'
import AppSider from '../components/AppSider'
import styles from './AppLayout.module.scss'

const cx = classNames.bind(styles)
const { Content } = Layout

const AppLayout = ({ padding = 32, collapsed = true }: { padding?: number; collapsed?: boolean }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout className={cx('app-layout')}>
      <AppHeader />
      <Layout className={cx('layout-content')}>
        <AppSider collapsed={collapsed} />
        <Content
          style={{
            marginLeft: 80,
            padding: padding,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
