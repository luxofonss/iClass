/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Typography } from 'antd'
import { Plus } from 'lucide-react'
import styles from './SectionBlock.module.scss'
const cx = classNames.bind(styles)

export default function SectionBlock() {
  return (
    <div className={cx('section-block-wrapper')}>
      <Typography.Title level={5} className={cx('section-block-title')}>
        Section 1: Introduction
      </Typography.Title>
      <Button icon={<Plus size={16} />} type='primary' className={cx('section-block-btn')}>
        New lecture
      </Button>
    </div>
  )
}
