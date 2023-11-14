/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import classNames from 'classnames/bind'

import { useRef } from 'react'
import useOutsideClick from '../../hooks/useClickOutside'
import styles from './TextEditor.module.scss'

const cx = classNames.bind(styles)

export default function TextEditor() {
  const editorWrapper = useRef<HTMLDivElement>(null)

  useOutsideClick(editorWrapper, () => {
    // alert('You clicked outside')
    hideToolbar()
  })

  const showToolbar = () => {
    const wrapper = editorWrapper.current as HTMLElement
    const toolbar = wrapper?.querySelector('.ck-toolbar') as HTMLElement

    if (toolbar) {
      toolbar.style.transition = 'height 0.5s, opacity 0.1s'
      toolbar.style.height = 'auto'
      toolbar.style.opacity = '1'
      toolbar.style.overflow = 'hidden'
    }
  }

  const hideToolbar = () => {
    const wrapper = editorWrapper.current as HTMLElement
    const toolbar = wrapper?.querySelector('.ck-toolbar') as HTMLElement

    if (toolbar) {
      toolbar.style.transition = 'height 0.5s, opacity 0.1s'
      toolbar.style.height = '0'
      toolbar.style.opacity = '0'
      toolbar.style.overflow = 'hidden'
    }
  }

  return (
    <div ref={editorWrapper} className={cx('wrapper')}>
      <CKEditor
        editor={ClassicEditor}
        data='<p>Hello from CKEditor&nbsp;5!</p>'
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
          editor.config.set('toolbar', ['heading', '|', 'bold', 'italic'])
          console.log(editor.config.get('toolbar'))
          hideToolbar()
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
          showToolbar()
        }}
      />
    </div>
  )
}
