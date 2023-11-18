/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Popover, Tag, Typography } from 'antd'

import Comment from '@components/Comment'
import CommentReply from '@components/CommentReply'
import ConversationInfo from '@components/ConversationInfo'
import EmojiPicker from '@components/EmojiPicker'
import { AVATAR } from '@shared/constants'
import classNames from 'classnames/bind'
import { SmilePlus } from 'lucide-react'
import styles from './Conversation.module.scss'

const cx = classNames.bind(styles)

export default function Conversation() {
  return (
    <div className={cx('conversation')}>
      <div>
        <Avatar className={cx('avatar')} size={48} src={AVATAR} alt='avatar' />
      </div>
      <div className={cx('content-wrapper')}>
        <div className={cx('header')}>
          <ConversationInfo />
          <Tag color='orange'>Notification</Tag>
        </div>
        <div className={cx('content')}>
          <Typography.Paragraph className={cx('text')}>
            Xin chào các em, kỳ 20221 này thầy sẽ cùng các em thực hiện môn học Nhập môn Công nghệ phần mềm. Thầy tạo
            nhóm Team để thuận tiện cho việc trao đổi trong quá trình học tập nhé. Thầy đã upload slide bài giảng lên
            mục Files, các em có thể tải về để học tập và theo dõi bài giảng trên lớp. Chúc các em một tuần mới học tập
            hiệu quả!
          </Typography.Paragraph>
          <div className={cx('reaction')}>
            <Popover content={<EmojiPicker />}>
              <SmilePlus size={16} />
            </Popover>
          </div>
        </div>
        <div className={cx('comments')}>
          <Comment />
          <Comment />
          <Comment />
          <CommentReply />
        </div>
      </div>
    </div>
  )
}
