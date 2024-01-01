/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import classNames from 'classnames/bind'
import { useCallback, useRef, useState } from 'react'
// => Tiptap packages
import ModalUploadImage from '@components/ModalUploadImage'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'
import useOutsideClick from '../../hooks/useClickOutside'
import * as Icons from './Icons'
import { LinkModal } from './LinkModal'
import styles from './Tiptap.module.scss'
import { FontSize } from './extensions/font-size'
// Custom

const cx = classNames.bind(styles)

interface ISimpleEditor {
  placeholder?: string
  onValueChange: (value: string) => void
  value?: string
  onChange?: (value: string) => void
}

export function SimpleEditor({ value, onChange, placeholder, onValueChange }: ISimpleEditor) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      TextStyle,
      FontSize.configure({
        types: ['textStyle']
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: placeholder
      }),
      Link.configure({
        openOnClick: false
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'my-custom-image-class'
        }
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    onUpdate({ editor }) {
      onValueChange(editor.getHTML())
    }
  }) as Editor
  const [modalIsOpen, setIsModalOpen] = useState(false)
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  const uploadImage = useRef(null)
  const editorWrapper = useRef<HTMLDivElement>(null)

  useOutsideClick(editorWrapper, () => {
    // alert('You clicked outside')
    setIsToolbarOpen(false)
  })

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes('link').href)
    setIsModalOpen(true)
  }, [editor])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setUrl('')
  }, [])

  const saveLink = useCallback(() => {
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    closeModal()
  }, [editor, url, closeModal])

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    closeModal()
  }, [editor, closeModal])

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run()
  }, [editor])

  const addImage = useCallback(() => {
    uploadImage.current?.openModal()
  }, [])

  const handleAddUrl = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div
      ref={editorWrapper}
      onFocus={(e) => {
        e.stopPropagation()
        setIsToolbarOpen(true)
      }}
      className={cx('editor-wrapper')}
    >
      <div style={isToolbarOpen ? {} : { display: 'none' }} className={cx('menu')}>
        <button
          className={cx('menu-button')}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className={cx('menu-button')}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('link')
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          onClick={() => {
            editor.commands.setFontSize('24px')
          }}
        >
          24
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('bold')
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('underline')
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('intalic')
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('strike')
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={cx('menu-button', {
            'is-active': editor.isActive('code')
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
        <button className={cx('menu-button')} onClick={addImage}>
          <ModalUploadImage handleOk={handleAddUrl} ref={uploadImage} />
        </button>
      </div>

      <BubbleMenu
        className='bubble-menu-light'
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive('link')
        }}
      >
        <button className='button' onClick={openModal}>
          Edit
        </button>
        <button className='button-remove' onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent className={cx('editor-content')} editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Link Modal'
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  )
}
