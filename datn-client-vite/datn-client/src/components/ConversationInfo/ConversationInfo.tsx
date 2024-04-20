/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Typography } from 'antd'
import styles from './ConversationInfo.module.scss'
const cx = classNames.bind(styles)

const { Text } = Typography

export default function ConversationInfo() {
  return (
    <div className={cx('conversation-info')}>
      <Text className={cx('name')}>Nguyễn Văn A</Text>
      <Text type='secondary' className={cx('time')}>
        10/11/2022 6:40 AM
      </Text>
    </div>
  )
}
