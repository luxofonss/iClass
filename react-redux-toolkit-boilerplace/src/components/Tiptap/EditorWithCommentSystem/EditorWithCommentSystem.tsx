/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react'
// => Tiptap packages
import { assignmentApi } from '@app-data/service/assignment.service'
import CommentInfo from '@components/CommentInfo'
import ModalUploadImage from '@components/ModalUploadImage'
import { Comment } from '@sereneinserenade/tiptap-comment-extension'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Color from '@tiptap/extension-color'
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
import { Button, Card, Col, Input, Row } from 'antd'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'
import useOutsideClick from '../../../hooks/useClickOutside'
import * as Icons from '../Icons'
import { LinkModal } from '../LinkModal'
import { FontSize } from '../extensions/font-size'
import styles from './EditorWithCommentSystem.module.scss'
// Custom

const cx = classNames.bind(styles)

interface IEditorWithCommentSystem {
  placeholder?: string
  onValueChange: (value: string) => void
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  comment?: boolean
  answerId?: string
  assignmentAttemptId?: string
  feedbacks?: Comment[]
  questionId?: string
}

//COMMENTS
interface Comment {
  id: string
  message: string
  createdAt: Date
  type: string
}

const getNewComment = (content: string, type: string): Comment => {
  return {
    id: `a${crypto.randomUUID()}a`,
    content,
    replies: [],
    createdAt: new Date(),
    type
  }
}
//END COMMENTS

export function EditorWithCommentSystem({
  value,
  onChange,
  placeholder,
  defaultValue,
  onValueChange,
  comment,
  answerId,
  questionId,
  assignmentAttemptId,
  feedbacks
}: IEditorWithCommentSystem) {
  const [content, setContent] = useState<string>(value ?? '')
  const [comments, setComments] = useState<Comment[]>(feedbacks ?? [])
  const [defaultContent, setDefaultContent] = useState<string>(value ?? '')
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)

  const commentsSectionRef = useRef<HTMLDivElement | null>(null)

  const [addFeedbackLongAnswer] = assignmentApi.endpoints.addFeedbackLongAnswer.useMutation()
  const [feedbackEditAnswerContent] = assignmentApi.endpoints.feedbackEditAnswerContent.useMutation()

  const focusCommentWithActiveId = (id: string) => {
    if (!commentsSectionRef.current) return

    const commentInput = commentsSectionRef.current.querySelector<HTMLInputElement>(`#${id}`)

    if (!commentInput) return

    commentInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  useEffect(() => {
    if (!activeCommentId) return

    setTimeout(() => {
      focusCommentWithActiveId(activeCommentId)
    }, 300)
  }, [activeCommentId])

  useEffect(() => {
    setDefaultContent(defaultValue ?? '')
    editor?.commands.setContent(defaultValue ?? '')
  }, [defaultValue])

  const getNewComment = (content: string, type: string): Comment => {
    return {
      id: `${crypto.randomUUID()}`,
      content,
      replies: [],
      createdAt: new Date(),
      type: type
    }
  }

  const deleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  async function submitFeedback(comment: { id: string; message: string; type: string }) {
    try {
      await addFeedbackLongAnswer({
        assignment_attempt_id: assignmentAttemptId ?? '',
        answer_id: answerId ?? '',
        body: {
          id: comment.id,
          message: comment.message ?? '',
          type: comment.type
        }
      }).unwrap()

      toast.success('Feedback submitted')
    } catch (error) {
      toast.error("Error: Can't submit feedback")
    }
  }

  const setComment = async (type: string) => {
    try {
      const newComment = getNewComment('', type)

      await submitFeedback({ id: newComment.id, message: newComment.message, type: type })
      // await addFeedbackLongAnswer({
      //   assignment_attempt_id: assignmentAttemptId ?? '',
      //   answer_id: answerId,
      //   body: {
      //     id: newComment.id,
      //     message: newComment.message,
      //     type: type
      //   }
      // }).unwrap()

      setComments([...comments, newComment])

      editor?.commands.setComment(newComment.id)

      setActiveCommentId(newComment.id)

      // setTimeout(focusCommentWithActiveId, [300])

      feedbackEditAnswerContent({
        assignment_attempt_id: assignmentAttemptId ?? '',
        question_id: questionId ?? '',
        answer: {
          id: answerId,
          selected_option_id: undefined,
          text_answer: content
        }
      }).unwrap()
    } catch (error) {
      toast.error("Error: Can't set comment")
    }
  }
  // endcomments

  const editor = useEditor({
    content: defaultContent,
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
      Code,
      Color.configure({
        types: ['textStyle']
      }),
      Comment.configure({
        HTMLAttributes: {
          class: 'my-comment'
        },
        onCommentActivated: (commentId) => {
          setActiveCommentId(commentId)

          if (commentId) setTimeout(() => focusCommentWithActiveId(commentId))
        }
      })
    ],
    onUpdate({ editor }) {
      onValueChange(editor.getHTML())
      onChange?.(editor.getHTML())
      setContent(editor.getHTML())
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

  // TOOLBAR HANDLER
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
  // END TOOLBAR HANDLER

  if (!editor) {
    return null
  }

  async function handleFeedback(values: any) {
    try {
      setActiveCommentId(null)
      editor.commands.focus()
      submitFeedback({
        id: values.id,
        message: values.message,
        type: values.type
      })
    } catch (error) {
      console.log('error:: ', error)
    }
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
      <Row gutter={24}>
        <Col span={comment ? 16 : 24}>
          <div className={cx('menu')}>
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

          <BubbleMenu className={cx('comment-bubble')} editor={editor}>
            <div>
              <strong>Feedback</strong>
            </div>
            <div className={cx('comment-btns')}>
              <Button
                onClick={() => {
                  editor.chain().focus().setColor('#a0d911').run()
                  setComment('GOOD')
                }}
                type='primary'
              >
                Good
              </Button>
              <Button
                type='primary'
                onClick={() => {
                  editor.chain().focus().setColor('#ff4d4f').run()
                  setComment('BAD')
                }}
                danger
              >
                Bad
              </Button>
            </div>
          </BubbleMenu>

          <EditorContent rows={10} height={400} spellCheck={false} className={cx('editor-content')} editor={editor} />

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
        </Col>

        {comment && (
          <Col span={comment ? 8 : 0}>
            <section className={cx('comment-section')} ref={commentsSectionRef}>
              {comments.length ? (
                comments.map((comment) => (
                  <Card
                    className={cx('comment-item')}
                    key={comment.id}
                    style={
                      comment.id === activeCommentId
                        ? {}
                        : comment.type === 'GOOD'
                        ? { backgroundColor: '#edf0f5', border: '1px solid #a0d911' }
                        : { backgroundColor: '#edf0f5', border: '1px solid #ff4d4f' }
                    }
                  >
                    <div className='flex items-end gap-2'>
                      <CommentInfo />
                    </div>

                    <Input
                      defaultValue={comment.message || ''}
                      disabled={comment.id !== activeCommentId}
                      style={comment.id === activeCommentId ? {} : { backgroundColor: '#edf0f5' }}
                      className={cx('comment-input')}
                      id={comment.id}
                      onChange={(event) => {
                        const value = (event.target as HTMLInputElement).value

                        setComments(
                          comments.map((comment) => {
                            if (comment.id === activeCommentId) {
                              return {
                                ...comment,
                                message: value
                              }
                            }

                            return comment
                          })
                        )
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== 'Enter') return

                        setActiveCommentId(null)
                      }}
                    />

                    {comment.id === activeCommentId && (
                      <div className={cx('submit-cmt')}>
                        <Button
                          onClick={() => {
                            editor?.commands.unsetComment(comment.id)
                            deleteComment(comment.id)
                          }}
                        >
                          Remove
                        </Button>
                        <Button
                          type='primary'
                          onClick={() => {
                            handleFeedback({
                              id: comment.id,
                              message: comment.message,
                              type: comment.type
                            })
                          }}
                          icon={<Send size={16} />}
                        >
                          Send
                        </Button>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <span className='pt-8 text-center text-slate-400'>No comments yet</span>
              )}
            </section>
          </Col>
        )}
      </Row>
    </div>
  )
}
