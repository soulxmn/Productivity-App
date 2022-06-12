import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Button, ButtonGroup, Paper, Stack } from "@mui/material";
import { Editor, RichUtils } from "draft-js";
import { red } from "@mui/material/colors";

import React from "react";
import { NotesIdentifiers } from "../../identifiers/identifiers";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

export default function MUIEditor({
  editorState,
  setEditorState,
  editor,
  error,
  view,
}) {
  // heading array
  const headerOptions = [
    { value: "header-one", content: "H1" },
    { value: "header-two", content: "H2" },
    { value: "header-three", content: "H3" },
    { value: "header-four", content: "H4" },
    { value: "header-five", content: "H5" },
    { value: "header-six", content: "H6" },
  ];

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  }

  function onStyleChange(e, style) {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function onHeadingChange(e, heading) {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, heading));
  }

  function hasStyle(style) {
    const inlineStyles = editorState.getCurrentInlineStyle();
    return inlineStyles.has(style);
  }

  // console.log(editorState.getBlockTree());
  function hasBlock(block) {
    return RichUtils.getCurrentBlockType(editorState) === block;
  }

  function focusEditor() {
    editor.current.focus();
  }

  return (
    <>
      <Stack width="100%" spacing={2}>
        {!view && (
          <Paper elevation={4} id={NotesIdentifiers.NOTE_STYLING_CONTAINER}>
            <Stack direction="row" sx={{ padding: 2 }} spacing={2}>
              <ButtonGroup>
                <Button
                  size="lg"
                  aria-label="bold"
                  variant={!hasStyle("BOLD") ? "outlined" : "contained"}
                  onClick={(e) => onStyleChange(e, "BOLD")}
                >
                  <FormatBoldIcon />
                </Button>
                <Button
                  size="lg"
                  aria-label="bold"
                  variant={!hasStyle("ITALIC") ? "outlined" : "contained"}
                  onClick={(e) => onStyleChange(e, "ITALIC")}
                >
                  <FormatItalicIcon />
                </Button>
                <Button
                  size="lg"
                  aria-label="bold"
                  variant={!hasStyle("UNDERLINE") ? "outlined" : "contained"}
                  onClick={(e) => onStyleChange(e, "UNDERLINE")}
                >
                  <FormatUnderlinedIcon />
                </Button>
                <Button
                  size="lg"
                  aria-label="strikethrough"
                  variant={
                    !hasStyle("STRIKETHROUGH") ? "outlined" : "contained"
                  }
                  onClick={(e) => onStyleChange(e, "STRIKETHROUGH")}
                >
                  <FormatStrikethroughIcon />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                {headerOptions.map((option, index) => (
                  <Button
                    size="large"
                    color="primary"
                    key={index}
                    variant={!hasBlock(option.value) ? "outlined" : "contained"}
                    onClick={(e) => onHeadingChange(e, option.value)}
                    aria-label={option.value}
                  >
                    {option.content}
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    !hasBlock("unordered-list-item") ? "outlined" : "contained"
                  }
                  onClick={(e) => onHeadingChange(e, "unordered-list-item")}
                  aria-label={"unordered-list-item"}
                >
                  <FormatListBulletedIcon />
                </Button>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    !hasBlock("ordered-list-item") ? "outlined" : "contained"
                  }
                  onClick={(e) => onHeadingChange(e, "ordered-list-item")}
                  aria-label={"ordered-list-item"}
                >
                  <FormatListNumberedIcon />
                </Button>
              </ButtonGroup>
            </Stack>
          </Paper>
        )}
        <Paper
          elevation={view ? 0 : 3}
          id={NotesIdentifiers.NOTE_BODY_EDIT_CONTAINER}
          sx={{
            minHeight: 400,
            cursor: "text",
            padding: view ? 0 : 3,
            border: error ? `1px solid ${red[500]}` : `0px`,
          }}
          onClick={focusEditor}
        >
          <Editor
            ref={editor}
            editorState={editorState}
            textAlignment="left"
            onChange={setEditorState}
            customStyleMap={styleMap}
            readOnly={view ? true : false}
            handleKeyCommand={handleKeyCommand}
            placeholder="Write something!"
          />
        </Paper>
      </Stack>
    </>
  );
}
