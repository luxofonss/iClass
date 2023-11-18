/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Button, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { BookText, Calendar, Folder, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AppSider.module.scss'
const cx = classNames.bind(styles)

const menuItems = [
  {
    key: '/classrooms',
    icon: <GraduationCap size={24} />,
    label: 'Classrooms'
  },
  {
    key: '/assignments',
    icon: <BookText size={24} />,
    label: 'Assignments'
  },
  {
    key: '/calendar',
    icon: <Calendar size={24} />,
    label: 'Calendar'
  },
  {
    key: '/files',
    icon: <Folder size={24} />,
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
          <Menu.Item
            key={item.key}
            icon={(() => (
              <div
                style={{
                  width: isCollapsed ? '100%' : '',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {item.icon}
              </div>
            ))()}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
