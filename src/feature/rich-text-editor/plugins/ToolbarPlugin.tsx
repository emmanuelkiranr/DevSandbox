import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ElementFormatPlugin from "./ElementFormatPlugin";
import TextFormatPlugin from "./TextFormatPlugin";
import ListElementPlugin from "./ListElementPlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import BlockElementsDropDown from "./components/BlockElementsDropDown";

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const handleSubmit = () => {
    editor.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log(markdown);
    });
  };
  return (
    <>
      <div className="toolbar">
        <BlockElementsDropDown />
        <Divider />
        <TextFormatPlugin />
        <Divider />
        <ListElementPlugin />
        <Divider />
        <ElementFormatPlugin />
      </div>
      <button onClick={handleSubmit}>Markdown</button>
    </>
  );
}
