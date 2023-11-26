import { useState } from 'react'

const useModal = () => {
  const [visible, setVisible] = useState(false)

  const openModal = () => {
    setVisible(true)
  }

  const closeModal = () => {
    console.log('close')
    setVisible(false)
  }

  return {
    openModal,
    closeModal,
    visible
  }
}

export default useModal
