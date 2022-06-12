import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Toolbar,
  Paper,
} from "@mui/material";
import axios from "axios";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React from "react";
import { NotesIdentifiers } from "../../identifiers/identifiers";
import NotesCard from "../Card/NotesCard";
import NotesActions from "./NoteDialogs";

export default function Notes({ user }) {
  const [notes, setNotes] = React.useState([]);

  const [noteData, setNoteData] = React.useState(EditorState.createEmpty());
  const editor = React.useRef(null);

  const [additionalContent, setAdditionalContent] = React.useState({
    title: "",
  });

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function getNotes() {
    await axios
      .get("http://localhost:3001/notes", {
        headers: {
          "x-api-key": user?.email,
        },
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {});
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  function handleChange(e, prop) {
    setAdditionalContent({ ...noteData, [prop]: e.target.value });
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={12} sm={12} width="100%">
          <Paper>
            <Toolbar>
              <Button
                id={NotesIdentifiers.NEW_NOTE_BUTTON}
                variant="contained"
                onClick={handleClickOpen}
              >
                New Note
              </Button>
            </Toolbar>
          </Paper>
        </Grid>
        {notes.map((note) => {
          const contentState = convertFromRaw(JSON.parse(note.content));
          const editorState = EditorState.createWithContent(contentState);
          console.log(note.title);
          return (
            <Grid
              id={NotesIdentifiers.NOTE_CARD}
              item
              lg={4}
              sm={12}
              key={note._id}
              width="100%"
            >
              <NotesCard
                title={note.title}
                content={editorState}
                id={note._id}
                notes={notes}
                setNotes={setNotes}
              />
            </Grid>
          );
        })}
      </Grid>
      <NotesActions
        open={open}
        setNotes={setNotes}
        notes={notes}
        getNotes={getNotes}
        handleClose={handleClose}
        user={user}
      />
    </>
  );
}
