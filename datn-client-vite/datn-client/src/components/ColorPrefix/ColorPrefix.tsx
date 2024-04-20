/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './ColorPrefix.module.scss'
const cx = classNames.bind(styles)

export default function ColorPrefix({ color }: { color: string }) {
  return <div style={{ backgroundColor: color }} className={cx('color-refix')}></div>
}
