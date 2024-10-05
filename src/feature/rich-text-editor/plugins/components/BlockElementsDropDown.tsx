/* eslint-disable @typescript-eslint/no-unused-vars */
import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type BlockElementTags = "code" | "paragraph";
type DropDownElements = HeadingTags | BlockElementTags;

const blockElements = [
  {
    id: 1,
    lable: "Normal",
    value: "paragraph",
  },
  {
    id: 2,
    lable: "Heading 1",
    value: "h1",
  },
  {
    id: 3,
    lable: "Heading 2",
    value: "h2",
  },
  {
    id: 4,
    lable: "Heading 3",
    value: "h3",
  },
  {
    id: 5,
    lable: "Heading 4",
    value: "h4",
  },
  {
    id: 6,
    lable: "Heading 5",
    value: "h5",
  },
  {
    id: 7,
    lable: "Heading 6",
    value: "h6",
  },
  {
    id: 8,
    lable: "Code Block",
    value: "code",
  },
];

const LowPriority = 1;

export default function BlockElementsDropDown() {
  const [editor] = useLexicalComposerContext();
  const [selectedBlock, setSelectedBlock] =
    useState<DropDownElements>("paragraph");

  const handleBlockElementChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const tag = event.target.value as DropDownElements;

    if (tag === "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    } else if (tag === "code") {
      editor.update(() => {
        let selection = $getSelection();
        if (selection !== null) {
          if (selection.isCollapsed()) {
            // isCollapsed means cursor is in a empty line / no text selected
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            // updating the selection with state
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              // text is inserted to codeBlock
              selection.insertRawText(textContent);
            }
          }
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if (selection) {
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    }
  };

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        const type = $isHeadingNode(element)
          ? (element.getTag() as HeadingTags)
          : (element.getType() as BlockElementTags);
        setSelectedBlock(type);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <select
      name="block-elements"
      id="block-elements"
      value={selectedBlock}
      onChange={handleBlockElementChange}
    >
      {blockElements.map((element) => (
        <option value={element.value} key={element.id}>
          {element.lable}
        </option>
      ))}
    </select>
  );
}
