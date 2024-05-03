import classNames from 'classnames/bind'
import { Header } from 'antd/es/layout/layout'
import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Typography, theme } from 'antd'
import { Bell, SearchIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../../app-data'
import styles from './AppHeader.module.scss'

const cx = classNames.bind(styles)

export default function AppHeader() {
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
    <div className={cx('user-dropdown')}>
      <div className={cx('info')}>
        <Typography.Text className={cx('name')}>{user?.firstName + ' ' + user?.lastName}</Typography.Text>
        <Typography.Text className={cx('position')}>@{user?.username}</Typography.Text>
      </div>
      <Button icon={<LogoutOutlined />} type='text' style={{ width: '100%' }} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )

  return (
    <Header className={cx('header')} style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}>
      <div className={cx('left')}>
        <div className={cx('logo')}>
          <img
            alt='logo'
            src={
              'https://www.learnify.com/wp-content/uploads/2019/02/xLearnify-Primary-2x.png.pagespeed.ic.k2waHY-min.png'
            }
          />
        </div>
        <div className={cx('search')}><input placeholder='Bạn muốn học gì? ' />
          <SearchIcon size={24} className={cx('icon')} /></div>
      </div>

      <div className={cx("right")}>
        {isLoggedIn ? (
          <div className={cx("user")}>
            <Link to='/teacher/courses'>
              <Button type='text'>Giáo viên</Button>
            </Link>
            <Link to='/courses/my-enrolled-courses'>
              <Button type='text'>Lớp học</Button>
            </Link>
            <Popover arrow content={messagesBox} title='Notifications' trigger='click'>
              <Badge className={cx('item')} size='small' count={10}>
                <Bell color={"#CACCCE"} style={{ fontSize: '24px' }} />
              </Badge>
            </Popover>
            <Popover content={userBox} trigger='click'>
              <Avatar className={cx('avatar')}
                src={
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                size={'large'}
              />
            </Popover>
          </div>
        ) : (
          <div className={cx('auth-btns')}>
            <Link to='/auth/sign-in'>
              <Button type='default'>Đăng nhập</Button>
            </Link>
            <Link to='/auth/sign-up'>
              <Button type='primary'>Đăng ký</Button>
            </Link>
          </div>
        )}
      </div>
    </Header>
  )
}
