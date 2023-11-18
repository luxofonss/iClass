/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import classNames from 'classnames/bind'
import { useCallback, useRef, useState } from 'react'
// => Tiptap packages
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import type { JSONContent } from '@tiptap/react'
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'
// Custom
import Placeholder from '@tiptap/extension-placeholder'
import useOutsideClick from '../../hooks/useClickOutside'
import * as Icons from './Icons'
import { LinkModal } from './LinkModal'
import styles from './Tiptap.module.scss'
import { FontSize } from './extensions/font-size'

const cx = classNames.bind(styles)

interface ISimpleEditor {
  placeholder?: string
  onValueChange: (value: JSONContent) => void
}

export function SimpleEditor({ placeholder, onValueChange }: ISimpleEditor) {
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
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    onUpdate({ editor }) {
      onValueChange(editor.getJSON())
    }
  }) as Editor
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isToolbarOpen, setToolbarOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  const editorWrapper = useRef<HTMLDivElement>(null)

  useOutsideClick(editorWrapper, () => {
    // alert('You clicked outside')
    setToolbarOpen(false)
  })

  const openModal = useCallback(() => {
    console.log(editor.chain().focus())
    setUrl(editor.getAttributes('link').href)
    setIsOpen(true)
  }, [editor])

  const closeModal = useCallback(() => {
    setIsOpen(false)
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

  if (!editor) {
    return null
  }

  return (
    <div
      ref={editorWrapper}
      onFocus={(e) => {
        e.stopPropagation()
        setToolbarOpen(true)
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