/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import SectionBlock from '@components/SectionBlock'
import ModalEditAddSection from '@container/app/Teacher/components/ModalEditAddSection'
import { Collapse } from 'antd'
import LectureBlock from '../../components/LectureBlock'
import styles from './Lectures.module.scss'
const cx = classNames.bind(styles)

export default function Lectures() {
  return (
    <div className={cx('lectures')}>
      <ModalEditAddSection />
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={<SectionBlock />} key='1'>
          <LectureBlock />
          <LectureBlock />
          <LectureBlock />
          <LectureBlock />
        </Collapse.Panel>
        <Collapse.Panel header={<SectionBlock />} key='1'>
          <LectureBlock />
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}
