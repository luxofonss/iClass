/* eslint-disable @typescript-eslint/no-explicit-any */

import LoadingOption from '@components/LoadingOption'
import { filterOption } from '@shared/utils/filterOptions'
import { Button, Select } from 'antd'

interface IAppSelectProps {
  data: any
  getData: () => void
  isGettingData: boolean
  selectAll?: boolean
  allowClear: boolean
  mode?: 'multiple' | 'tags' | undefined
  placeholder: string
  labelField: string
  valueField: string
  value?: any
  onChange?: (value: any) => void
}

export default function AppSelect(props: IAppSelectProps) {
  const {
    selectAll = false,
    data,
    getData,
    isGettingData,
    allowClear,
    mode = undefined,
    placeholder,
    labelField,
    valueField,
    value,
    onChange
  } = props

  return (
    <Select
      value={value}
      onChange={(value) => {
        if (value && value.length && value.includes('all')) {
          if (value.length === data.length + 1) {
            onChange?.([])
          }
          const values = data.map((item: any) => item[valueField])
          onChange?.(values)
        } else {
          onChange?.(value)
        }
      }}
      onFocus={() => {
        if (!data) getData()
      }}
      allowClear={allowClear}
      mode={mode}
      maxTagCount={2}
      filterOption={filterOption}
      placeholder={placeholder}
      loading={isGettingData}
      dropdownRender={(menu) => {
        if (!isGettingData)
          if (!data?.length)
            return (
              <div>
                <Button
                  type='dashed'
                  style={{ margin: '0 auto' }}
                  onClick={() => {
                    getData()
                  }}
                >
                  Loading fail, click here to reload!
                </Button>
              </div>
            )
          else return <> {menu}</>
        else {
          return <LoadingOption />
        }
      }}
    >
      {data?.length > 0 && (
        <>
          {selectAll && (
            <Select.Option key='all' value='all'>
              All
            </Select.Option>
          )}
          {data?.map((channel: any) => {
            return (
              <Select.Option key={channel[valueField]} value={channel[valueField]} label={channel[labelField]}>
                {channel[labelField]}
              </Select.Option>
            )
          })}
        </>
      )}
    </Select>
  )
}
