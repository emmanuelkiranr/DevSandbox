import { $getSelection, LexicalEditor } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import SvgIcon from "../../../assets/Icons";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export default function HeadingPlugin(props: {
  editor: LexicalEditor;
}): JSX.Element {
  const headingTags: HeadingTag[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const handleHeadingClick = (tag: HeadingTag) => {
    props.editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <>
      {headingTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleHeadingClick(tag)}
          className="toolbar-item spaced "
        >
          <SvgIcon name={tag} />
        </button>
      ))}
    </>
  );
}
