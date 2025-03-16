import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { editorTheme } from "./config/editor-themes";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { useState } from "react";
import { LexicalEditor } from "lexical";
import "./editor.css";

const placeholder = "Enter some rich text...";

export default function Editor(): JSX.Element {
  const [editor, setEditor] = useState<LexicalEditor>();
  const editorConfig = {
    namespace: "Lexical Editor",
    onError(error: Error) {
      throw error;
    },
    theme: editorTheme,
    nodes: [HeadingNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode],
    // editorState: () => $convertFromMarkdownString(text, undefined),
  };

  const handleSubmit = () => {
    editor?.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log(markdown);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin setEditor={setEditor} />
        <ListPlugin />
        <CodeHighlightPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
      <button onClick={handleSubmit} className="btn-primary">
        Submit
      </button>
    </LexicalComposer>
  );
}
