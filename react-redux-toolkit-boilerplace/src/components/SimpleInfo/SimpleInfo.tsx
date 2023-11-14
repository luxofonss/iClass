/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './SimpleInfo.module.scss'
const cx = classNames.bind(styles)

interface ISimpleInfo {
  label: string
  value: string
}

export default function SimpleInfo({ value, label }: ISimpleInfo) {
  return (
    <div className={cx('simple-info')}>
      <p className={cx('label')}>{label}: </p>
      <p className={cx('value')}>{value}</p>
    </div>
  )
}
