import { Outlet } from 'react-router-dom'

import auth_background from '@assets/images/auth_background.png'

import classNames from 'classnames/bind'
import styles from './AuthLayout.module.scss'

const cx = classNames.bind(styles)

function AuthLayout() {
  return (
    <div className={cx('flex-center', 'auth-layout')} style={{ backgroundImage: `url(${auth_background})` }}>
      <h1>AuthLayout</h1>
      <Outlet />
    </div>
  )
}

export default AuthLayout
