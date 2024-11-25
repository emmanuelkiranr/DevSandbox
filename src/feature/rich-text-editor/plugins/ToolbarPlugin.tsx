import ElementFormatPlugin from "./ElementFormatPlugin";
import TextFormatPlugin from "./TextFormatPlugin";
import ListElementPlugin from "./ListElementPlugin";
import BlockElementsDropDown from "./components/BlockElementsDropDown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { LexicalEditor } from "lexical";

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin(props: {
  setEditor: (value: LexicalEditor) => void;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    props.setEditor(editor);
  }, [editor, props]);

  return (
    <div className="toolbar">
      <BlockElementsDropDown />
      <Divider />
      <TextFormatPlugin />
      <Divider />
      <ListElementPlugin />
      <Divider />
      <ElementFormatPlugin />
    </div>
  );
}
