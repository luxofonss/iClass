/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import type { JSONContent } from '@tiptap/react'
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'
import { v4 as uuidv4 } from 'uuid'
import useOutsideClick from '../../hooks/useClickOutside'
import * as Icons from './Icons'
import { LinkModal } from './LinkModal'
import styles from './Tiptap.module.scss'
import { Comment } from './extensions/comment'
import { FontSize } from './extensions/font-size'
// Custom

const cx = classNames.bind(styles)
const dateTimeFormat = 'dd.MM.yyyy HH:mm'
interface CommentInstance {
  uuid?: string
  comments?: any[]
}

interface ISimpleEditor {
  placeholder?: string
  onValueChange: (value: JSONContent) => void
}

export function EditorWithComment({ placeholder, onValueChange }: ISimpleEditor) {
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
      Comment,
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    onUpdate({ editor }) {
      onValueChange(editor.getJSON())

      findCommentsAndStoreValues()

      setCurrentComment(editor)
    },

    onSelectionUpdate({ editor }) {
      setCurrentComment(editor)

      setIsTextSelected(!!editor.state.selection.content().size)
    }
  }) as Editor
  const [modalIsOpen, setIsModalOpen] = useState(false)
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  // Comments

  const [isCommentModeOn, setIsCommentModeOn] = useState(true)

  const [currentUserName, setCurrentUserName] = useState('sereneinserenade')

  const [commentText, setCommentText] = useState('')

  const [showCommentMenu, setShowCommentMenu] = useState(false)

  const [isTextSelected, setIsTextSelected] = useState(false)

  const [showAddCommentSection, setShowAddCommentSection] = useState(true)

  const formatDate = (d: any) => d?.toString() ?? 'date'

  const [activeCommentsInstance, setActiveCommentsInstance] = useState<CommentInstance>({})

  const [allComments, setAllComments] = useState<any[]>([])
  // End comments

  const uploadImage = useRef(null)
  const editorWrapper = useRef<HTMLDivElement>(null)

  //Comment functions

  const findCommentsAndStoreValues = () => {
    const proseMirror = document.querySelector('.ProseMirror')

    const comments = proseMirror?.querySelectorAll('span[data-comment]')

    const tempComments: any[] = []

    if (!comments) {
      setAllComments([])
      return
    }

    comments.forEach((node) => {
      const nodeComments = node.getAttribute('data-comment')

      const jsonComments = nodeComments ? JSON.parse(nodeComments) : null

      if (jsonComments !== null) {
        tempComments.push({
          node,
          jsonComments
        })
      }
    })

    setAllComments(tempComments)
  }

  const setCurrentComment = (editor: any) => {
    const newVal = editor.isActive('comment')

    if (newVal) {
      setTimeout(() => setShowCommentMenu(newVal), 50)

      setShowAddCommentSection(!editor.state.selection.empty)

      const parsedComment = JSON.parse(editor.getAttributes('comment').comment)

      parsedComment.comment =
        typeof parsedComment.comments === 'string' ? JSON.parse(parsedComment.comments) : parsedComment.comments

      setActiveCommentsInstance(parsedComment)
    } else {
      setActiveCommentsInstance({})
    }
  }

  const setComment = () => {
    if (!commentText.trim().length) return

    const activeCommentInstance: CommentInstance = JSON.parse(JSON.stringify(activeCommentsInstance))

    const commentsArray =
      typeof activeCommentInstance.comments === 'string'
        ? JSON.parse(activeCommentInstance.comments)
        : activeCommentInstance.comments

    if (commentsArray) {
      commentsArray.push({
        userName: currentUserName,
        time: Date.now(),
        content: commentText
      })

      const commentWithUuid = JSON.stringify({
        uuid: activeCommentsInstance.uuid || uuidv4(),
        comments: commentsArray
      })

      // eslint-disable-next-line no-unused-expressions
      editor?.chain().setComment(commentWithUuid).run()
    } else {
      const commentWithUuid = JSON.stringify({
        uuid: uuidv4(),
        comments: [
          {
            userName: currentUserName,
            time: Date.now(),
            content: commentText
          }
        ]
      })

      // eslint-disable-next-line no-unused-expressions
      editor?.chain().setComment(commentWithUuid).run()
    }

    setTimeout(() => setCommentText(''), 50)
  }

  useEffect((): any => setTimeout(findCommentsAndStoreValues, 100), [])
  // End comment functions

  useOutsideClick(editorWrapper, () => {
    // alert('You clicked outside')
    setIsToolbarOpen(false)
  })

  const openModal = useCallback(() => {
    console.log(editor.chain().focus())
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

      {editor && (
        <BubbleMenu
          tippy-options={{ duration: 100, placement: 'bottom' }}
          editor={editor}
          className='bubble-menu'
          // shouldShow={() => (isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid)}
        >
          <section className='comment-adder-section bg-white shadow-lg'>
            <textarea
              value={commentText}
              onInput={(e) => setCommentText((e.target as any).value)}
              onKeyPress={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault()
                  e.stopPropagation()
                  setComment()
                }
              }}
              cols={30}
              rows={4}
              placeholder='Add comment...'
              className='border-none outline-none'
            />

            <section className='flex flex-row w-full gap-1'>
              <button
                className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded shadow-lg w-1/3'
                onClick={() => setCommentText('')}
              >
                Clear
              </button>

              <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-lg w-2/3'
                onClick={() => setComment()}
              >
                Add
              </button>
            </section>
          </section>
        </BubbleMenu>
      )}

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

      <section className='flex flex-col'>
        {allComments.map((comment, i) => {
          return (
            <article
              className={`comment external-comment shadow-lg my-2 bg-gray-100 transition-all rounded-md overflow-hidden ${
                comment.jsonComments.uuid === activeCommentsInstance.uuid ? 'ml-4' : 'ml-8'
              }`}
              key={i + 'external_comment'}
            >
              {comment.jsonComments.comments.map((jsonComment: any, j: number) => {
                return (
                  <article key={`${j}_${Math.random()}`} className='external-comment border-b-2 border-gray-200 p-3'>
                    <div className='comment-details'>
                      <strong>{jsonComment.userName}</strong>

                      <span className='ml-1 date-time text-xs'>{formatDate(jsonComment.time)}</span>
                    </div>

                    <span className='content'>{jsonComment.content}</span>
                  </article>
                )
              })}

              {comment.jsonComments.uuid === activeCommentsInstance.uuid && (
                <section className='flex flex-col w-full gap-1'>
                  <textarea
                    value={commentText}
                    onInput={(e) => setCommentText((e.target as any).value)}
                    onKeyPress={(e) => {
                      if (e.keyCode === 13) {
                        e.preventDefault()
                        e.stopPropagation()
                        setComment()
                      }
                    }}
                    cols={30}
                    rows={4}
                    placeholder='Add comment...'
                    className='border-none outline-none'
                  />

                  <section className='flex flex-row w-full gap-1'>
                    <button
                      className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg shadow-lg w-1/3'
                      onClick={() => setCommentText('')}
                    >
                      Clear
                    </button>

                    <button
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg shadow-lg w-2/3'
                      onClick={() => setComment()}
                    >
                      Add (<kbd className=''>Ent</kbd>)
                    </button>
                  </section>
                </section>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
