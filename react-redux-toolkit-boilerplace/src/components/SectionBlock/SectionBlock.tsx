/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { SectionSchema } from '@shared/schema/course.schema'
import { Button, Typography } from 'antd'
import { Plus } from 'lucide-react'
import styles from './SectionBlock.module.scss'
const cx = classNames.bind(styles)

export default function SectionBlock({
  mode = 'user',
  data,
  index
}: {
  mode?: string
  data: SectionSchema
  index: number
}) {
  return (
    <div className={cx('section-block-wrapper')}>
      <Typography.Title level={5} className={cx('section-block-title')}>
        Section {index + 1}: {data?.name}
      </Typography.Title>
      {mode === 'admin' && (
        <Button icon={<Plus size={16} />} type='primary' className={cx('section-block-btn')}>
          New lecture
        </Button>
      )}
    </div>
  )
}
