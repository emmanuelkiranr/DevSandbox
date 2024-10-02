import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ElementFormatPlugin from "../components/ElementFormatPlugin";
import TextFormatPlugin from "../components/TextFormatPlugin";
import HeadingPlugin from "../components/HeadingPlugin";
import ListElementPlugin from "../components/ListElementPlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

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
        <HeadingPlugin editor={editor} />
        <Divider />
        <TextFormatPlugin editor={editor} />
        <Divider />
        <ListElementPlugin editor={editor} />
        <Divider />
        <ElementFormatPlugin editor={editor} />
      </div>
      <button onClick={handleSubmit}>Markdown</button>
    </>
  );
}
