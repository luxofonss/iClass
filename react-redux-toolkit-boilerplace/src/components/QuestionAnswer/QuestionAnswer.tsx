/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeQuestion } from '@components/QuestionTypeIcon/QuestionTypeIcon'
import { QUESTION_TYPE_ENUM } from '@shared/constants'
import type { FormListFieldData } from 'antd'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames/bind'
import { Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { QuestionField } from '../../types/question'
import styles from './QuestionAnswer.module.scss'

const cx = classNames.bind(styles)

const answerType = {
  single_choice: 'choices',
  multi_choice: 'choices',
  short_answer: 'answers',
  long_answer: 'answers'
}

export default function QuestionAnswer({
  type,
  field,
  questionKey
}: {
  type: TypeQuestion
  field: QuestionField | FormListFieldData
  questionKey?: number
}) {
  const name = questionKey !== undefined ? [field.name, answerType[type]] : [field.name, field.key, answerType[type]]
  const questionField = field
  const [choiceList, setChoiceList] = useState<string[]>([])
  const [answerName, setAnswerName] = useState<any>(name)
  // const [selectedValue, setSelectedValue] = useState<number>()

  // const handleRadioChange = (e: RadioChangeEvent) => {
  //   console.log('selectedValue:: ', selectedValue)
  //   setSelectedValue(e.target.value)
  // }

  // const form = useFormInstance()

  useEffect(() => {
    if (questionKey !== undefined) {
      setAnswerName([field.name, answerType[type]])
    } else {
      setAnswerName([field.name, field.key, answerType[type]])
    }
  }, [questionKey])

  // function handleSelectCorrectAnswer(key: number, name: number) {
  //   let questions, choice
  //   const formValues = form.getFieldsValue()
  //   if (questionKey !== undefined) {
  //     questions = formValues.questions
  //     choice = questions[questionKey].questions[field.key].choices[key]
  //   } else {
  //     questions = formValues.questions
  //     choice = questions[field.key].choices[key]
  //   }

  //   if (type === 'single-choice') {
  //     if (questionKey !== undefined) Object.assign(questions[questionKey].questions[field.key], { answers: choice })
  //     else {
  //       Object.assign(questions[field.key], { answers: choice })
  //       form.setFieldValue(['questions', questionKey, name, 'is_correct'], true)
  //     }
  //     setCorrectAnswerKey([key])
  //   } else if (type === 'multi-choice') {
  //     if (questionKey !== undefined) {
  //       const currentAnswer = questions[questionKey].questions[field.key].answers
  //       const newAnswer = currentAnswer ? [...currentAnswer] : []
  //       const newKeys = [...correctAnswerKey]
  //       const index = newAnswer.indexOf(choice)
  //       if (index === -1) {
  //         // set correct answer
  //         form.setFieldValue(['questions', questionKey, name, 'is_correct'], true)
  //         newAnswer.push(choice)
  //         newKeys.push(key)
  //       } else {
  //         // remove correct answer
  //         form.setFieldValue(['questions', questionKey, name, 'is_correct'], false)
  //         newAnswer.splice(index, 1)
  //         newKeys.splice(index, 1)
  //       }
  //       Object.assign(questions[questionKey].questions[field.key], { answers: newAnswer })
  //       setCorrectAnswerKey(newKeys)
  //     } else {
  //       const currentAnswer = questions[field.key].answers
  //       const newAnswer = currentAnswer ? [...currentAnswer] : []
  //       const newKeys = [...correctAnswerKey]
  //       const index = newAnswer.indexOf(choice)
  //       if (index === -1) {
  //         // set correct answer
  //         form.setFieldValue(['questions', questionKey, 'questions', field.key, name, 'is_correct'], true)
  //         newAnswer.push(choice)
  //         newKeys.push(key)
  //       } else {
  //         // remove correct answer
  //         form.setFieldValue(['questions', questionKey, 'questions', field.key, name, 'is_correct'], false)
  //         newAnswer.splice(index, 1)
  //         newKeys.splice(index, 1)
  //       }
  //       Object.assign(questions[field.key], { answers: newAnswer })
  //       setCorrectAnswerKey(newKeys)
  //     }
  //   }
  //   form.setFieldsValue({ questions })
  // }

  return (
    <div>
      <Form.List name={answerName}>
        {(fields, { add, remove }) => {
          return (
            <div className={cx('wrapper')}>
              <Row gutter={24}>
                {fields.map((field, index) => (
                  <Col span={12} key={field.key}>
                    <div className={cx('item')}>
                      {/* <QuestionTypeIcon
                          correct={
                            (type === 'single-choice' || type === 'multi-choice') && correctAnswerKey.includes(field.name)
                          }
                          onClick={() => {
                            handleSelectCorrectAnswer(field.key, field.name)
                          }}
                          type={type}
                        /> */}
                      {type === QUESTION_TYPE_ENUM.SINGLE_CHOICE ? (
                        <Form.Item valuePropName='checked' name={[field.name, 'is_correct']}>
                          {/* <Radio value={field.name} checked={false} onChange={handleRadioChange} /> */}
                          <input type='radio' style={{ width: 20, height: 20 }} name={questionField.name.toString()} />
                        </Form.Item>
                      ) : type === QUESTION_TYPE_ENUM.MULTI_CHOICE ? (
                        <Form.Item valuePropName='checked' name={[field.name, 'is_correct']}>
                          <Checkbox name={questionField.name.toString()} />
                        </Form.Item>
                      ) : null}

                      <Form.Item className={cx('input')} style={{ margin: 0 }} name={[field.name, 'content']}>
                        <TextArea
                          rows={1}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const newChoiceList = [...choiceList]
                            newChoiceList[index] = event.target.value
                            setChoiceList(newChoiceList)
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        hidden
                        initialValue={index}
                        className={cx('input')}
                        style={{ margin: 0 }}
                        name={[field.name, 'order']}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        hidden
                        initialValue={false}
                        className={cx('input')}
                        style={{ margin: 0 }}
                        name={[field.name, 'is_correct']}
                      >
                        <Input />
                      </Form.Item>
                      <Button
                        danger
                        icon={<Trash size={14} />}
                        className={cx('btn-remove')}
                        onClick={() => {
                          remove(index)
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
              <Button
                icon={<Plus size={14} />}
                className={cx('btn-add')}
                onClick={() => {
                  add()
                }}
              >
                Add answer
              </Button>
            </div>
          )
        }}
      </Form.List>
      {(type === QUESTION_TYPE_ENUM.MULTI_CHOICE || type === QUESTION_TYPE_ENUM.SINGLE_CHOICE) && (
        <div hidden className={cx('answer')}>
          <Form.Item
            name={questionKey !== undefined ? [field.name, 'answers'] : [field.name, field.key, 'answers']}
            label='Key'
          >
            <Input />
          </Form.Item>
        </div>
      )}
    </div>
  )
}
