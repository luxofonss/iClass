/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { AVATAR_2 } from '@shared/constants'
import { Avatar, Typography } from 'antd'
import styles from './CommentInfo.module.scss'
const cx = classNames.bind(styles)

export default function CommentInfo() {
  return (
    <div className={cx('conversation-info')}>
      <Avatar src={AVATAR_2} alt='avatar' />
      <div>
        <div className={cx('name')}>Nguyễn Văn A</div>
        <div className={cx('time')}>
          <Typography.Text type='secondary'> 10/11/2022 6:40 AM</Typography.Text>
        </div>
      </div>
    </div>
  )
}
