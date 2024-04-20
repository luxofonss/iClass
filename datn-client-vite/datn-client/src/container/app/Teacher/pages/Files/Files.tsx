/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './Files.module.scss'
const cx = classNames.bind(styles)

export default function Files() {
  return <div className={cx('files')}>Files</div>
}
