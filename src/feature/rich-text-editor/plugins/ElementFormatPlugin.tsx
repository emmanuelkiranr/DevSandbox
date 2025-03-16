import { FORMAT_ELEMENT_COMMAND } from 'lexical'
import SvgIcon from '../../../assets/Icons'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export default function ElementFormatPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  return (
    <>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
        }}
        className='toolbar-item spaced'
        aria-label='Left Align'
      >
        <SvgIcon name='align-left' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
        }}
        className='toolbar-item spaced'
        aria-label='Center Align'
      >
        <SvgIcon name='align-center' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
        }}
        className='toolbar-item spaced'
        aria-label='Right Align'
      >
        <SvgIcon name='align-right' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        }}
        className='toolbar-item'
        aria-label='Justify Align'
      >
        <SvgIcon name='align-justify' />
      </button>
    </>
  )
}
