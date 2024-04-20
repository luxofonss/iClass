/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Tabs } from 'antd'
import ClassSettingMembers from '../../components/ClassSettingMembers'
import styles from './ClassSettings.module.scss'
const cx = classNames.bind(styles)

export default function ClassSettings() {
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className={cx('class-settings')}>
      <Tabs defaultActiveKey='1' onChange={onChange}>
        <Tabs.TabPane tab='Members' key='members'>
          <ClassSettingMembers />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Analytics' key='2'>
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
