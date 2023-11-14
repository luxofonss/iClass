/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './Comment.module.scss'
import { Avatar } from 'antd'
import { IMAGE } from '@shared/constants'
import ConversationInfo from '@components/ConversationInfo'
const cx = classNames.bind(styles)

export default function Comment() {
  return (
    <div className={cx('comment')}>
      <div className={cx('avatar')}>
        <Avatar src={IMAGE} alt='avatar' />
      </div>
      <div className={cx('content-wrapper')}>
        <ConversationInfo />
        <div className={cx('content')}>
          <p className={cx('text')}>Dạ cô ơi, em đang bị sốt xuất huyết nên em xin phép thứ 4 đến báo cáo ạ</p>
          <div className={cx('reaction')}></div>
        </div>
      </div>
    </div>
  )
}
