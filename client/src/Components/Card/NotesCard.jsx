import React, { useState } from "react";
import {
  Card,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import NotesActions from "../Notes/NoteDialogs";
import { NotesIdentifiers } from "../../identifiers/identifiers";

export default function NotesCard({ content, id, notes, setNotes, title }) {
  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function deleteNote(id) {
    await axios
      .delete(`http://localhost:3001/notes/${id}`, {
        headers: {
          "x-api-key": "Test",
        },
      })
      .then(() => {
        const notesCopy = [...notes];
        const notesIndex = notesCopy.findIndex((note) => note.id === id);
        notesCopy.splice(notesIndex, 1);
        setNotes(notesCopy);
      })
      .catch((err) => {});
  }
  return (
    <>
      <Card
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Note
          </Typography>

          <Typography
            sx={{ marginTop: 4 }}
            id={NotesIdentifiers.NOTE_CARD_TITLE}
            variant="h3"
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            id={NotesIdentifiers.NOTE_ACTION_CONTAINER}
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                id={NotesIdentifiers.DELETE_NOTE_BUTTON}
                onClick={() => deleteNote(id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Edit"}>
              <IconButton
                aria-label={"Edit"}
                id={NotesIdentifiers.EDIT_NOTE_BUTTON}
                onClick={handleClickOpen}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Card>
      <NotesActions
        viewNote
        open={open}
        title={title}
        id={id}
        setNotes={setNotes}
        content={content}
        notes={notes}
        handleClose={handleClose}
      />
    </>
  );
}

NotesCard.propTypes = {
  content: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
