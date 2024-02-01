/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './AssignmentDetail.module.scss'
const cx = classNames.bind(styles)

export default function AssignmentDetail() {
  return <div className={cx('assignment-detail')}>AssignmentDetail</div>
}
