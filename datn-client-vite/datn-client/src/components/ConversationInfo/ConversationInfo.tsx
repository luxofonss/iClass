/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Typography } from 'antd'
import styles from './ConversationInfo.module.scss'
import { ConversationSchema } from '@/shared/schema/conversation.schema'
const cx = classNames.bind(styles)

const { Text } = Typography

interface IConversationInfoProps {
  data: ConversationSchema
}

export default function ConversationInfo(props: IConversationInfoProps) {
  const { data } = props
  return (
    <div className={cx('conversation-info')}>
      <Text className={cx('name')}>{data?.user?.firstName + " " + data?.user?.lastName}</Text>
      <Text type='secondary' className={cx('time')}>
        {data?.createdAt}
      </Text>
    </div>
  )
}
