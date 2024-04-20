import classNames from 'classnames/bind'

import { Spin } from 'antd'
import styles from './LoadingOption.module.scss'

const cx = classNames.bind(styles)

function LoadingOption() {
  return (
    <div className={cx('select-option-loading')} key='loading'>
      <Spin size='small' /> Loading options...
    </div>
  )
}

export default LoadingOption
