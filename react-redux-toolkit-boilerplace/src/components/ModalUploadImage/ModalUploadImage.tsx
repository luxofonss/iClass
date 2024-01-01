import { Modal, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import classNames from 'classnames/bind'
import { ImageIcon } from 'lucide-react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import useModal from '../../hooks/useModal'
import styles from './ModalUploadImage.module.scss'

const cx = classNames.bind(styles)

interface IModalUploadImageProps {
  handleOk: (url: UploadFile<unknown>[]) => void
}

const ModalUploadImage = forwardRef((props: IModalUploadImageProps, ref) => {
  const { handleOk } = props
  const { openModal, closeModal, visible } = useModal()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [src, setSrc] = useState<string>('')

  console.log('src:: ', src)
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
    setSrc(src)
  }

  // Expose openModal function via ref
  useImperativeHandle(ref, () => ({
    openModal
  }))

  return (
    <div className={cx('modal-upload-image')}>
      <ImageIcon onClick={openModal} />
      <Modal
        open={visible}
        title='Upload image'
        onOk={() => {
          if (fileList.length > 0) {
            handleOk(fileList)
            closeModal()
          }
        }}
        onCancel={closeModal}
      >
        <ImgCrop rotationSlider>
          <Upload listType='picture-card' fileList={fileList} onChange={onChange} onPreview={onPreview}>
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </Modal>
    </div>
  )
})

ModalUploadImage.displayName = 'ModalUploadImage'

export default ModalUploadImage
