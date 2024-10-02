import { LexicalEditor, FORMAT_ELEMENT_COMMAND } from "lexical";
import SvgIcon from "../../../assets/Icons";

export default function ElementFormatPlugin(props: {
  editor: LexicalEditor;
}): JSX.Element {
  return (
    <>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <SvgIcon name="align-left" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <SvgIcon name="align-center" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <SvgIcon name="align-right" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <SvgIcon name="align-justify" />
      </button>
    </>
  );
}
