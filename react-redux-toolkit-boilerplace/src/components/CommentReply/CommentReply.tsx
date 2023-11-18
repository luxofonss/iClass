/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { SimpleEditor } from '@components/Tiptap'
import { AVATAR_2 } from '@shared/constants'
import { Avatar } from 'antd'
import { Send } from 'lucide-react'
import styles from './CommentReply.module.scss'
const cx = classNames.bind(styles)

export default function CommentReply() {
  return (
    <div className={cx('comment-reply')}>
      <Avatar src={AVATAR_2} alt='avatar' />
      <SimpleEditor />
      <Send className={cx('send-btn')} size={24} color='#787ef5' />
    </div>
  )
}
