/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './LectureDiscuss.module.scss'
import Conversation from '@components/Conversation'

const cx = classNames.bind(styles)

export default function LectureDiscuss() {
  return (
    <div className={cx('lecture-discuss')}>
      <div className={cx('content')}>
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </div>
  )
}
