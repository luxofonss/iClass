/* eslint-disable @typescript-eslint/no-explicit-any */
import { schema } from 'prosemirror-schema-basic'
import 'prosemirror-view/style/prosemirror.css'
import { ProseMirror, useProseMirror } from 'use-prosemirror'

export default function TextEditor2() {
  const [state, setState] = useProseMirror({ schema })
  return <ProseMirror state={state} onChange={setState} />
}
