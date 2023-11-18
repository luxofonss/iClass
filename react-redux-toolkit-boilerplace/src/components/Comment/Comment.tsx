/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import classNames from 'classnames/bind'

import CommentReply from '@components/CommentReply'
import ConversationInfo from '@components/ConversationInfo'
import EmojiPicker from '@components/EmojiPicker'
import { AVATAR_2 } from '@shared/constants'
import { Avatar, Popover, Typography } from 'antd'
import { SmilePlus } from 'lucide-react'
import styles from './Comment.module.scss'
const cx = classNames.bind(styles)

export default function Comment() {
  const [isComment, setIsComment] = useState(false)

  function openCommentBox() {
    setIsComment(true)
  }
  return (
    <div className={cx('comment')}>
      <div className={cx('avatar')}>
        <Avatar src={AVATAR_2} alt='avatar' />
      </div>
      <div className={cx('content-wrapper')}>
        <ConversationInfo />
        <div className={cx('content')}>
          <Typography.Paragraph className={cx('text')}>
            Dạ cô ơi, em đang bị sốt xuất huyết nên em xin phép thứ 4 đến báo cáo ạ
          </Typography.Paragraph>
          <div className={cx('reaction')}></div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('reaction')}>
            <Popover content={<EmojiPicker />}>
              <SmilePlus size={16} />
            </Popover>
          </div>
          <button onClick={openCommentBox} className={cx('reply-btn')}>
            Reply
          </button>
        </div>
        {isComment && <CommentReply />}
      </div>
    </div>
  )
}
