import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect } from "react";
import { NotesIdentifiers } from "../../identifiers/identifiers";
import MUIEditor from "../RichText/Editor";

export default function NotesActions({
  viewNote,
  setNotes,
  title,
  content,
  notes,
  id,
  open,
  handleClose,
  user,
}) {
  const [noteData, setNoteData] = React.useState(
    viewNote ? content : EditorState.createEmpty()
  );
  const editor = React.useRef(null);

  /*
  ====== EDITING ======
  */
  // determine if the user is editing or not
  const [editing, setEditing] = React.useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  const [errors, setErrors] = React.useState({
    title: "",
    content: "",
  });

  const [additionalContent, setAdditionalContent] = React.useState({
    title: title,
  });

  useEffect(() => {
    console.log(title);

    setAdditionalContent({
      title: title,
    });
  }, []);

  async function createNote() {
    let _noteData = noteData.getCurrentContent();
    let content = "";

    if (!noteData.getCurrentContent().hasText()) {
      content = "";
    } else {
      content = JSON.stringify(convertToRaw(_noteData));
    }

    await axios
      .post(
        "http://localhost:3001/notes",
        {
          content: content,
          title: additionalContent.title,
        },
        {
          headers: {
            "x-api-key": user?.email,
          },
        }
      )
      .then((res) => {
        setNotes([...notes, res.data]);
        setNoteData(EditorState.createEmpty());
        closeDialog();
      })
      .catch((err) => {
        setErrors(err.response.data.errors.message);
      });
  }

  async function editNote(id) {
    let _noteData = noteData.getCurrentContent();

    const content = JSON.stringify(convertToRaw(_noteData));
    await axios
      .put(
        `http://localhost:3001/notes/${id}`,
        {
          content: content,
          title: additionalContent.title,
        },
        {
          headers: {
            "x-api-key": user?.email,
          },
        }
      )
      .then((res) => {
        const contentState = convertFromRaw(JSON.parse(res.data.content));
        const editorState = EditorState.createWithContent(contentState);

        const notesCopy = [...notes];

        const notesIndex = notesCopy.findIndex((note) => note._id === id);
        notesCopy[notesIndex].title = res.data.title;
        notesCopy[notesIndex].content = res.data.content;

        setNotes(notesCopy);
        setNoteData(editorState);
        setEditing(false);
      })
      .catch((err) => {});
  }

  function handleChange(e, prop) {
    setAdditionalContent({ ...additionalContent, [prop]: e.target.value });
  }

  function closeDialog() {
    setAdditionalContent("");
    setErrors({ title: "", content: "" });
    handleClose();
  }
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={closeDialog}>
        <DialogTitle>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
            id={NotesIdentifiers.EDIT_NEW_NOTE_CONTAINER}
          >
            {editing ? "Edit" : viewNote ? "View" : "New"} Note
            {viewNote && (
              <Button
                id={NotesIdentifiers.STOP_EDITING_EDIT_BUTTON}
                variant="contained"
                onClick={toggleEditing}
              >
                {editing ? "Stop Editing" : "Edit"} Note
              </Button>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={4}
            id={NotesIdentifiers.NOTE_CONTAINER}
            sx={{ marginTop: 2 }}
          >
            {!viewNote ? (
              <FormControl
                id={NotesIdentifiers.NOTE_TITLE_FIELD}
                fullWidth
                error={errors.title.length > 0}
              >
                <TextField
                  error={errors.title.length > 0}
                  label="Title"
                  id="fullWidth"
                  onChange={(e) => handleChange(e, "title")}
                />
                <FormHelperText id={NotesIdentifiers.NOTE_TITLE_ERROR}>
                  {errors.title}
                </FormHelperText>
              </FormControl>
            ) : editing ? (
              <TextField
                fullWidth
                label="Title"
                id="fullWidth"
                defaultValue={title}
                onChange={(e) => handleChange(e, "title")}
              />
            ) : (
              <>
                <Typography id={NotesIdentifiers.NOTE_TITLE}>
                  <strong>Title:</strong> {title}
                </Typography>
              </>
            )}
            {!viewNote ? (
              <>
                <MUIEditor
                  editorState={noteData}
                  setEditorState={setNoteData}
                  editor={editor}
                  error={errors.content}
                />
                {errors.content && (
                  <Typography
                    id={NotesIdentifiers.NOTE_BODY_ERROR}
                    color="error"
                    sx={{ lineHeight: 0 }}
                  >
                    {errors.content}
                  </Typography>
                )}
              </>
            ) : editing ? (
              <MUIEditor
                editorState={noteData}
                setEditorState={setNoteData}
                editor={editor}
              />
            ) : (
              <MUIEditor
                editorState={noteData}
                setEditorState={setNoteData}
                editor={editor}
                view
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          {!viewNote && (
            <Button
              id={NotesIdentifiers.CREATE_NOTE_BUTTON}
              variant="contained"
              onClick={createNote}
            >
              Add New
            </Button>
          )}
          {editing && (
            <Button
              id={NotesIdentifiers.SAVE_NOTE_BUTTON}
              variant="contained"
              onClick={() => editNote(id)}
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
