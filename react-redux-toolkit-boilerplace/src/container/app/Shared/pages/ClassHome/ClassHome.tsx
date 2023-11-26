/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

// import greeting from '@assets/images/greeting.png'
import Conversation from '@components/Conversation'
import { SimpleEditor } from '@components/Tiptap'
import styles from './ClassHome.module.scss'

const cx = classNames.bind(styles)

export default function ClassHome() {
  function onValueChange(value: any) {
    console.log(value)
  }

  return (
    <div className={cx('class-home')}>
      {/* <div className={cx('greeting')}>
        <h1 className={cx('title')}>Welcome to class!</h1>
        <img src={greeting} alt='greeting' />
      </div> */}
      <div className={cx('content')}>
        {/* <TextEditor /> */}
        <SimpleEditor onValueChange={onValueChange} />

        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </div>
  )
}
