/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LexicalEditor,
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useState, useCallback, useEffect } from "react";
import SvgIcon from "../../../assets/Icons";

const LowPriority = 1;

export default function TextFormatPlugin(props: { editor: LexicalEditor }) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  // subscript and superscript to add

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      props.editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      props.editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [props.editor, $updateToolbar]);

  return (
    <>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <SvgIcon name="bold" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <SvgIcon name="italic" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <SvgIcon name="underline" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <SvgIcon name="strikethrough" />
      </button>
      <button
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
        className={"toolbar-item spaced " + (isCode ? "active" : "")}
        aria-label="Format Code"
      >
        <SvgIcon name="code" />
      </button>
    </>
  );
}
