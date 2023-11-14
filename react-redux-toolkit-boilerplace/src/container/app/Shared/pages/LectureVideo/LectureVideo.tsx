/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import styles from './LectureVideo.module.scss'
import ReactPlayer from 'react-player'
const cx = classNames.bind(styles)

export default function LectureVideo() {
  return (
    <div className={cx('lecture-video')}>
      <ReactPlayer
        width='1280px'
        height='720px'
        url='https://www.youtube.com/watch?v=GrG2-oX5z24&t=1260s&ab_channel=FallInChill'
      />
    </div>
  )
}
