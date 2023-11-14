/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import Assignments from '@container/app/Teacher/pages/Assignments'
import { Tabs } from 'antd'
import ClassFiles from '../ClassFiles'
import LectureVideo from '../LectureVideo'
import styles from './LectureDetail.module.scss'
import LectureDiscuss from '../LectureDiscuss'
import { useSearchParams } from 'react-router-dom'
const cx = classNames.bind(styles)

export default function LectureDetail() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleTabChange = (tabKey: string) => {
    setSearchParams({ tab: tabKey })
  }
  const onChange = (key: string) => {
    handleTabChange(key)
  }

  return (
    <div className={cx('lecture-detail')}>
      <Tabs defaultActiveKey={searchParams.get('tab') || ''} onChange={onChange}>
        <Tabs.TabPane tab='Video' key='video'>
          <LectureVideo />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Files' key='files'>
          <ClassFiles />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Assignments' key='assignments'>
          <Assignments />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Discuss channel' key='discuss'>
          <LectureDiscuss />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
