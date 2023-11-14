/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './Calendar.module.scss'
const cx = classNames.bind(styles)

export default function Calendar() {
  return <div className={cx('calendar')}>Calendar</div>
}
