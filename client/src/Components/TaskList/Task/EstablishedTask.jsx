import React, {useState} from "react";
import { Button, Grid, Typography, Fab, Checkbox } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CreateTask from "./CreateTask";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TextField } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function EstablishedTask(props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [dueDateBeingEdited, setDueDateBeingEdited] = useState(false);
    const handleEditTaskCompletion = async (completed, taskId) => {
      const response = await fetch("http://localhost:3001/task/"+taskId+"/", {
      method: "PATCH",
      headers: { "x-api-key": props.user?.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        completed, 
        }),
      });
      const response2 = await fetch("http://localhost:3001/user" , {
        method: "PATCH",
        headers: { "x-api-key": props.user?.email, "Content-Type": "application/json" },
        body: JSON.stringify({
          points: completed ? props.user_model.points +1 :props.user_model.points,
        }),
      });
      props.setPoints( completed ? props.user_model.points +1 :props.user_model.points);
      props.setRefresh(!props.refresh)
    };

    return (
      <>
        {isBeingEdited ? (
          <CreateTask
            _id={props._id}
            taskName={props.taskName}
            priority={props.priority}
            completed={props.completed}
            dueDate={props.dueDate}
            handleUpdate={props.handleUpdate}
            doneBeingEdited={()=>setIsBeingEdited(false)}
          ></CreateTask>
        ) : (
          <Grid container sx={{overflow: "hidden"}}>
            <Grid item xs={1} sx={{display: "flex", alignItems:"center", justifyContent: "center"}}>
            <Checkbox checked={props.completed} sx={{color: "white"}} onChange={() => handleEditTaskCompletion(!props.completed, props._id)}></Checkbox>
            </Grid>
            <Grid item xs={11}>
              <Typography
                color="white"
                align="left"
                variant="h6"
                //fontFamily="sans serif"
              >
                {props.taskName}
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              {props.priority + " "}
              PRIORITY
            </Grid>
            <Grid item xs={2}>
              <Fab
                variant="extended"
                size="small"
                color={props.completed ? "primary" : "secondary"}
              >
                {props.completed ? "Completed" : "In Progress"}
              </Fab>
            </Grid>
            <Grid item xs={3}>
              <Typography
                color="white"
                align="right"
                variant="h8"
                fontFamily="Courier"
              >
                Due: 
                {props.dueDate?.split("T")?.[0]}
                {" "}
                {props.dueDate?.split("T")?.[1]?.split(".")?.[0]}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button>
                <EditOutlinedIcon
                  style={{ color: "#68b4f2" }}
                  onClick={() => setIsBeingEdited(true)}
                />
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button>
                <DeleteIcon
                  style={{ color: "red" }}
                  onClick={() => props.handleDelete(props._id)}
                ></DeleteIcon>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <>
                {dueDateBeingEdited ? (
                  <TextField
                    style={{ color: "black", background: "white" }}
                    label="Due Date"
                    type="datetime-local"
                    //defaultValue={props.dueDate}
                    //sx={{ width: 100 }}
                    onChange={(event) => {
                      let dueDate = event.target.value;
                      setDueDateBeingEdited(false);
                      props.handleUpdate(
                        props._id,
                        props.taskName,
                        props.completed,
                        props.priority,
                        dueDate
                      );
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ) : (<Button>
                  <CalendarTodayIcon
                    style={{ color: "gray" }}
                    onClick={() => setDueDateBeingEdited(true)}
                  ></CalendarTodayIcon>
                  </Button>
                )}
              </>
            </Grid>
          </Grid>
        )}
      </>
    );
}