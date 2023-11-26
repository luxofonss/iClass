/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Typography } from 'antd'
import styles from './SimpleInfo.module.scss'
const cx = classNames.bind(styles)

interface ISimpleInfo {
  label: string
  value: string
}

export default function SimpleInfo({ value, label }: ISimpleInfo) {
  return (
    <div className={cx('simple-info')}>
      <Typography.Text className={cx('label')}>{label}: </Typography.Text>
      <Typography.Text className={cx('value')}>{value}</Typography.Text>
    </div>
  )
}
