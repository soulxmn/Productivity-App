import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Stack, Typography, Box, Card, Grid } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Timer from "../../Components/Clock/Timer";
import Settings from "../../Components/Clock/Settings";
import SettingsContext from "../../Components/Clock/SettingsContext";
import Notifications from "../Notifications/Notifications";
//import Player from "./MusicPlayer/Player";
//import Songs from "./MusicPlayer/Songs.js";
import Player from "../MusicPlayer/Player";
import Songs from "../MusicPlayer/Songs";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ForestWidget from "../ForestWidget/ForestWidget";

// Modal Box Styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function WidgetsPannel({ user, completedProjects }) {
  const [dnd, setDND] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [modalOpen, setModalOpen] = useState(false);
  // Points for Pomodoro Timer component only.
  // Actual points system will be a series of User Stories in later sprints.
  const [points, incrementPoints] = useState(0);

  const musicWidgetBool = localStorage.getItem("musicWidget");
  console.log(musicWidgetBool);

  // const data = [
  //   {
  //     id: "musicid1",
  //     ind:1,
  //     widgetname: "musicWidget",
  //     widget:<Player songs = {Songs}></Player>
  //   },
  //   {
  //     id: "forestid",
  //     ind:2,
  //     widgetname: "forestWidget",
  //     widget:<ForestWidget completedProjects={completedProjects} user={user} sx={{ padding: 10 }} />
  //   }
  // ];

  const [list, setList] = React.useState([]);
  useEffect(() => {
    const data = [
      {
        id: "musicid1",
        ind: 1,
        widgetname: "musicWidget",
        widget: <Player songs={Songs}></Player>,
      },
      {
        id: "forestid",
        ind: 2,
        widgetname: "forestWidget",
        widget: (
          <ForestWidget
            completedProjects={completedProjects}
            user={user}
            sx={{ padding: 10 }}
          />
        ),
      },
    ];

    setList(data);
    return () => {};
  }, [completedProjects, user]);

  // Function that reorders everything after drag and drop
  const reorder = (list, source, destination) => {
    const result = Array.from(list);
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    return result;
  };

  //onEnd function for Drag and Drop
  const onEnd = (result) => {
    console.log(result);
    setList(reorder(list, result.source.index, result.destination.index));
  };

  return (
    <Grid item>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0b0424",
          height: "100vh",
        }}
      >
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes: workMinutes,
            breakMinutes: breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Typography color="white">Do Not Disturb Mode</Typography>
            <Box>
              <Button
                onClick={() => {
                  setDND(!dnd);
                  setOpen(true);
                }}
                variant="contained"
              >
                Toggle DND
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <Alert
                  variant="filled"
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <AlertTitle>
                    Do Not Disturb mode {dnd ? "ENABLED" : "DISABLED"}.
                  </AlertTitle>
                  You will{" "}
                  <strong>{dnd ? "NOT RECEIVE ANY " : "RECEIVE ALL "}</strong>
                  notifications and alerts.
                </Alert>
              </Collapse>
            </Box>
          </Stack>
          <Notifications dnd={dnd} user={user} />
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Typography color="white">Need help concentrating?</Typography>
            <Box>
              <Button
                onClick={() => {
                  setModalOpen(true);
                  incrementPoints(points + 1);
                }}
                variant="contained"
              >
                Enable Focus Mode
              </Button>
            </Box>

            <Box>
              <Modal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    color="white"
                  >
                    Pomodoro Timer
                  </Typography>
                  {showSettings ? <Settings /> : <Timer />}
                </Box>
              </Modal>
            </Box>
            <DragDropContext onDragEnd={onEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {/* Everything iside this div becomes a droppable container for react beautiful dndb*/}
                    {list.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        key={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {localStorage.getItem(item.widgetname) ===
                                "true" && item.widget}
                            </div>
                          </Box>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Stack>
        </SettingsContext.Provider>
      </Box>
    </Grid>
  );
}

export default WidgetsPannel;
