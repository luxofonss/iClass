/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { courseApi } from '@app-data/service/course.service'
import SectionBlock from '@components/SectionBlock'
import ModalEditAddSection from '@container/app/Teacher/components/ModalEditAddSection'
import { Collapse } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LectureBlock from '../../components/LectureBlock'
import styles from './Lectures.module.scss'
const cx = classNames.bind(styles)

export default function Lectures() {
  const { id } = useParams<any>()

  const [getAllSections, { isLoading: isGettingSections }] = courseApi.endpoints.getAllSectionInCourse.useLazyQuery()

  useEffect(() => {
    if (id) {
      getAllSections({ id })
    }
  }, [id])

  return (
    <div className={cx('lectures')}>
      <ModalEditAddSection />
      {isGettingSections ? (
        <div>Loading... </div>
      ) : (
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
      )}
    </div>
  )
}
