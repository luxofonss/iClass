/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'
import classNames from 'classnames/bind'

import AppHeader from '../components/AppHeader'
import styles from './GeneralLayout.module.scss'

const cx = classNames.bind(styles)
const { Content } = Layout

const GeneralLayout = () => {
  return (
    <Layout className={cx('app-layout')}>
      <AppHeader />
      <Layout className={cx('layout-content')}>
        <Content
          style={{
            minHeight: 280,
            background: '#fff'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeneralLayout
