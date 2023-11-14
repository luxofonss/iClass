/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './Demo.module.scss'
const cx = classNames.bind(styles)

export default function Demo() {
  return <div className={cx('demo')}>Demo</div>
}
