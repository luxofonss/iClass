/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Menu, theme } from 'antd'
import styles from './AppSider.module.scss'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { BookText, Folder, GraduationCap, Calendar } from 'lucide-react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const menuItems = [
  {
    key: '/classrooms',
    icon: <GraduationCap size={16} />,
    label: 'Classrooms'
  },
  {
    key: '/assignments',
    icon: <BookText size={16} />,
    label: 'Assignments'
  },
  {
    key: '/calendar',
    icon: <Calendar size={16} />,
    label: 'Calendar'
  },
  {
    key: '/files',
    icon: <Folder size={16} />,
    label: 'Files'
  }
]

export default function AppSider({ collapsed = false }: { collapsed: boolean }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const {
    token: { colorBorderSecondary }
  } = theme.useToken()

  const navigate = useNavigate()

  return (
    <Sider
      style={{ borderRight: `1px solid ${colorBorderSecondary}` }}
      className={cx('sider')}
      theme='light'
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <Button
        className={cx('menu-collapse')}
        type='text'
        icon={isCollapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 24,
          height: 24
        }}
      />
      <Menu
        className={cx('menu')}
        theme='light'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        onClick={(e: any) => {
          navigate(e.key)
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} style={{ fontWeight: 500 }}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
