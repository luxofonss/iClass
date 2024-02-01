/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { courseApi } from '@app-data/service/course.service'
import SectionBlock from '@components/SectionBlock'
import ModalEditAddLecture from '@container/app/Teacher/components/ModalEditAddLecture'
import ModalEditAddSection from '@container/app/Teacher/components/ModalEditAddSection'
import { ROLE } from '@shared/constants'
import { LectureSchema, SectionSchema } from '@shared/schema/course.schema'
import { Collapse } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LectureBlock from '../../components/LectureBlock'
import styles from './Lectures.module.scss'
const cx = classNames.bind(styles)

export default function Lectures({ mode }: { mode: string }) {
  const { id } = useParams<any>()

  const [getAllSections, { data: sections, isLoading: isGettingSections }] =
    courseApi.endpoints.getAllSectionInCourse.useLazyQuery()

  useEffect(() => {
    if (id) {
      getAllSections({ id })
    }
  }, [id])

  return (
    <div className={cx('lectures')}>
      {mode === ROLE.TEACHER && <ModalEditAddSection />}
      {isGettingSections ? (
        <div>Loading... </div>
      ) : (
        <Collapse defaultActiveKey={['1']}>
          {sections?.data?.map((section: SectionSchema, index: number) => (
            <Collapse.Panel
              header={<SectionBlock mode={mode} data={section} index={index} />}
              key={section.id || index}
            >
              {section?.lectures?.map((lecture: LectureSchema) => <LectureBlock key={lecture.id} data={lecture} />)}
              {mode === ROLE.TEACHER && <ModalEditAddLecture />}
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </div>
  )
}
