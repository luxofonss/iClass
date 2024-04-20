/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { Breadcrumb, Button, Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

import styles from './ClassFiles.module.scss'
import Search from 'antd/es/input/Search'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface DataType {
  key: React.Key
  name: string
  owner: string
  modifiedAt: string
  createdAt: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    sorter: {
      compare: (a, b) => a.owner.localeCompare(b.owner),
      multiple: 3
    }
  },
  {
    title: 'Modified at',
    dataIndex: 'modifiedAt',
    sorter: {
      compare: (a, b) => a.modifiedAt.localeCompare(b.modifiedAt),
      multiple: 2
    }
  },
  {
    title: 'Uploaded at',
    dataIndex: 'createdAt',
    sorter: {
      compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
      multiple: 1
    }
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'Kho đề',
    owner: 'Nguyễn Văn A',
    modifiedAt: '2014-12-24 23:12:00',
    createdAt: '2014-12-24 23:12:00'
  },
  {
    key: '2',
    name: 'Đề tự tự luận',
    owner: 'Nguyễn Văn A',
    modifiedAt: '2014-12-24 23:12:00',
    createdAt: '2014-12-24 23:12:00'
  },
  {
    key: '3',
    name: 'Bảng điểm giữa kỳ',
    owner: 'Nguyễn Văn A',
    modifiedAt: '2014-12-24 23:12:00',
    createdAt: '2014-12-24 23:12:00'
  },
  {
    key: '4',
    name: 'Bảng điểm cuôi kỳ',
    owner: 'Nguyễn Văn A',
    modifiedAt: '2014-12-24 23:12:00',
    createdAt: '2014-12-24 23:12:00'
  }
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function ClassFiles() {
  return (
    <div className={cx('class-files')}>
      <div className={cx('navigation')}>
        <Breadcrumb
          items={[
            {
              title: 'Files'
            },
            {
              title: <Link to='/'>Đề thi</Link>
            },
            {
              title: <Link to='/'>Lớp 12</Link>
            }
          ]}
        />
      </div>
      <div className={cx('heading')}>
        <div className={cx('filter')}>
          <Search placeholder='input search text' enterButton='Search' />
        </div>
        <div className={cx('action')}>
          <Button icon={<Plus size={14} />}>Upload</Button>
        </div>
      </div>
      <Table className={cx('table')} pagination={false} columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
