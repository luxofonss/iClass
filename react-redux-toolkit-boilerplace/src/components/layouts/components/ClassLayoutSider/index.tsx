/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { ROLE } from '@shared/constants'
import { SimpleCourseView } from '@shared/schema/course.schema'
import { Divider, Menu, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { BookCheck, BookText, Folder, GraduationCap, Settings } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './ClassLayoutSider.module.scss'
const cx = classNames.bind(styles)

interface IClassLayoutSiderProps {
  siderCollapsed: boolean
  data: SimpleCourseView
  mode: string
}

export default function ClassLayoutSider({ siderCollapsed, data, mode }: IClassLayoutSiderProps) {
  const navigate = useNavigate()

  console.log('mode:: ', mode)
  const { id } = useParams()

  const menuItems = [
    {
      key: mode === ROLE.TEACHER ? `/teacher/courses/${id}/home` : `/courses/${id}/home`,
      icon: <GraduationCap size={16} />,
      label: 'Home page'
    },
    {
      key: mode === ROLE.TEACHER ? `/teacher/courses/${id}/lectures` : `/courses/${id}/lectures`,
      icon: <BookCheck size={16} />,
      label: 'Lectures'
    },
    {
      key: mode === ROLE.TEACHER ? `/teacher/courses/${id}/assignments` : `/courses/${id}/assignments`,
      icon: <BookText size={16} />,
      label: 'Assignments'
    },
    {
      key: mode === ROLE.TEACHER ? `/teacher/courses/${id}/files` : `/courses/${id}/files`,
      icon: <Folder size={16} />,
      label: 'Files'
    },
    mode === ROLE.TEACHER && {
      key: `/teacher/courses/${id}/settings`,
      icon: <Settings size={16} />,
      label: 'Settings'
    }
  ]

  return (
    <Sider className={cx('sider')} theme='light' trigger={null} collapsible collapsed={siderCollapsed} width={240}>
      <div className={cx('class-info')}>
        <img className={cx('thumbnail')} src={data?.background_img} alt='logo' />
        {!siderCollapsed && (
          <Typography.Title level={4} ellipsis={{ rows: 2, tooltip: data?.name }} className={cx('class-name')}>
            {data?.name}
          </Typography.Title>
        )}
      </div>
      <Divider />
      <Menu
        className={cx('menu')}
        theme='light'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        onClick={(e: any) => {
          navigate(e.key)
        }}
      >
        {menuItems.map((item) =>
          item ? (
            <Menu.Item style={{ fontSize: 14 }} key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ) : null
        )}
      </Menu>
    </Sider>
  )
}
