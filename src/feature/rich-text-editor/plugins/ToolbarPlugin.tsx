import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ElementFormatPlugin from "../components/ElementFormatPlugin";
import TextFormatPlugin from "../components/TextFormatPlugin";

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <div className="toolbar">
      <TextFormatPlugin editor={editor} />
      <Divider />
      <ElementFormatPlugin editor={editor} />
    </div>
  );
}
