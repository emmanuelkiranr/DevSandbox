import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND
  // REMOVE_LIST_COMMAND
} from '@lexical/list'
import SvgIcon from '../../../assets/Icons'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

type ListTag = 'ul' | 'ol'

export default function ListElementPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const listTags: ListTag[] = ['ul', 'ol']
  const handleListClick = (tag: ListTag) => {
    if (tag === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
      return
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }

  return (
    <>
      {listTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleListClick(tag)}
          className='toolbar-item spaced '
        >
          <SvgIcon name={tag} />
        </button>
      ))}
    </>
  )
}
