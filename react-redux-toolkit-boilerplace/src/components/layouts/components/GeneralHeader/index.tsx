import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Typography, theme } from 'antd'
import Search from 'antd/es/input/Search'
import { Header } from 'antd/es/layout/layout'
import classNames from 'classnames/bind'
import { Bell, MessageCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../../app-data'
import styles from './GeneralHeader.module.scss'

const cx = classNames.bind(styles)

export default function GeneralHeader() {
  const user = useSelector((state: RootState) => state.auth.user)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
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
    navigate('/auth/sign-in')
  }

  const userBox = (
    <Button icon={<LogoutOutlined />} type='text' style={{ width: '100%' }} onClick={handleLogout}>
      Logout
    </Button>
  )

  return (
    <Header className={cx('header')} style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}>
      <Link to='/' className={cx('logo')}>
        <img
          alt='logo'
          src={
            'https://www.learnify.com/wp-content/uploads/2019/02/xLearnify-Primary-2x.png.pagespeed.ic.k2waHY-min.png'
          }
        />
      </Link>

      <div className={cx('search-bar')}>
        <Search size='large' />
      </div>
      {isLoggedIn && (
        <Link to='/courses/my-enrolled-courses'>
          <Button>My learning</Button>
        </Link>
      )}

      {/* {user && ( */}
      {isLoggedIn ? (
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
            <Typography.Text className={cx('name')}>{user?.first_name + ' ' + user?.last_name}</Typography.Text>
            <Typography.Text className={cx('position')}>@{user?.username}</Typography.Text>
          </div>
        </div>
      ) : (
        <Link to='/auth/sign-in'>
          <Button type='primary'>Login</Button>
        </Link>
      )}
      {/* )} */}
    </Header>
  )
}
