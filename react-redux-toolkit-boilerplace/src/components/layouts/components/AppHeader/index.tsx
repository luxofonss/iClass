import classNames from 'classnames/bind'

import { Header } from 'antd/es/layout/layout'

import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Typography, theme } from 'antd'
import { Bell, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './AppHeader.module.scss'
const cx = classNames.bind(styles)

export default function AppHeader() {
  const {
    token: { colorBorderSecondary }
  } = theme.useToken()

  const messagesBox = (
    <div>
      <div>message 1</div>
      <div>message 2</div>
      <div>message 3</div>
    </div>
  )

  const navigate = useNavigate()

  const handleLogout = () => {
    // dispatch(logout())
    navigate('/sign-in')
  }

  const userBox = (
    <Button icon={<LogoutOutlined />} type='text' style={{ width: '100%' }} onClick={handleLogout}>
      Logout
    </Button>
  )

  return (
    <Header className={cx('header')} style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}>
      <div className={cx('logo')}>
        <img
          alt='logo'
          src={
            'https://www.learnify.com/wp-content/uploads/2019/02/xLearnify-Primary-2x.png.pagespeed.ic.k2waHY-min.png'
          }
        />
      </div>

      {/* {user && ( */}
      <div className={cx('user')}>
        <Popover content={messagesBox} title='Messages' trigger='click'>
          <Badge size='small' count={4}>
            <MessageCircle style={{ fontSize: '24px' }} />
          </Badge>
        </Popover>
        <Popover arrow content={messagesBox} title='Notifications' trigger='click'>
          <Badge size='small' count={10}>
            <Bell style={{ fontSize: '24px' }} />
          </Badge>
        </Popover>
        <Popover content={userBox} trigger='click'>
          <Avatar
            src={
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            size={'large'}
          />
        </Popover>

        <div className={cx('info')}>
          <Typography.Text className={cx('name')}>Nguyen Van A</Typography.Text>
          <Typography.Text className={cx('position')}>CEO</Typography.Text>
        </div>
      </div>
      {/* )} */}
    </Header>
  )
}
