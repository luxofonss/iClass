/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './EmojiPicker.module.scss'
import { useState } from 'react'
const cx = classNames.bind(styles)

export default function EmojiPicker() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji)
  }

  return (
    <div className={cx('emoji-picker')}>
      <div className={cx('emoji-list')}>
        <span onClick={() => handleEmojiClick('❤️')} role='button' tabIndex={0}>
          {selectedEmoji === '❤️' ? '❤️' : '👍'}
        </span>
        <span onClick={() => handleEmojiClick('😂')} role='button' tabIndex={0}>
          {selectedEmoji === '😂' ? '😂' : '😆'}
        </span>
        <span onClick={() => handleEmojiClick('👍')} role='button' tabIndex={0}>
          {selectedEmoji === '👍' ? '👍' : '😊'}
        </span>
        <span onClick={() => handleEmojiClick('😠')} role='button' tabIndex={0}>
          {selectedEmoji === '😠' ? '😠' : '😡'}
        </span>
        <span onClick={() => handleEmojiClick('😢')} role='button' tabIndex={0}>
          {selectedEmoji === '😢' ? '😢' : '😞'}
        </span>
      </div>
      {selectedEmoji && <p>You selected: {selectedEmoji}</p>}
    </div>
  )
}
