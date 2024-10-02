import { LexicalEditor } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  // REMOVE_LIST_COMMAND
} from "@lexical/list";
import SvgIcon from "../../../assets/Icons";

type ListTag = "ul" | "ol";

export default function ListElementPlugin(props: {
  editor: LexicalEditor;
}): JSX.Element {
  const listTags: ListTag[] = ["ul", "ol"];
  const handleListClick = (tag: ListTag) => {
    if (tag === "ol") {
      props.editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    props.editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <>
      {listTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleListClick(tag)}
          className="toolbar-item spaced "
        >
          <SvgIcon name={tag} />
        </button>
      ))}
    </>
  );
}
