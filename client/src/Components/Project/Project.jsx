import {
  Typography,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Divider,
  Checkbox,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { propsToClassKey } from "@mui/styles";

export function AddProjectDialog({ setRefresh, refresh, user }) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const handleCreateClose = (e) => {
    setOpenCreateDialog(false);
    e.stopPropagation();
  };

  // FORM PEICES
  const [projectName, setProjectName] = useState("");
  const [dueDate, setProjectDueDate] = useState("");
  const handleCreateProject = async () => {
    const response = await fetch("http://localhost:3001/project/", {
      method: "POST",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        projectName,
        dueDate,
      }),
    });
    setRefresh(!refresh);
    setOpenCreateDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="small"
        onClick={() => setOpenCreateDialog(true)}
      >
        Add a Project
      </Button>
      <Dialog
        open={openCreateDialog}
        onBackdropClick={handleCreateClose}
        fullWidth
        maxWidth="sm"
        xs={{ padding: 2 }}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          style: {
            backgroundColor: "#2F0E5A",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <DialogTitle sx={{ flex: 1 }}>Create New Project</DialogTitle>
          <IconButton sx={{ color: "white" }} onClick={handleCreateClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ width: "100%", background: "white" }} />
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ paddingRight: 2, flex: 1 }}>
              <b>Name Project: </b>
            </Typography>
            <TextField
              onChange={(event) => {
                setProjectName(event.target.value);
              }}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <Typography sx={{ paddingRight: 2, flex: 1 }}>
              <b>Set Target Deadline: </b>
            </Typography>
            <TextField
              onChange={(event) => {
                setProjectDueDate(event.target.value);
              }}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              variant="standard"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleCreateClose}
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleCreateProject}
            size="small"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function ProjectCard({
  sample_project,
  user,
  setPoints,
  setRefresh_list,
  refresh_list,
  setNumCompleted,
}) {
  const newDate = new Date();
  const [refresh, setRefresh] = useState(false);
  const [project, setProject] = useState(sample_project);
  const [user_model, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/project/" + sample_project._id + "/", {
      method: "GET",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setProject(responseJSON);
      });
    fetch("http://localhost:3001/user/", {
      method: "GET",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setUser(responseJSON?.[0]);
      });
  }, [refresh]);

  let {
    dueDate: goalDate,
    projectName: title,
    completionStatus: progress,
    relatedTasks: tasks,
  } = project;
  goalDate = goalDate.split("T")[0];
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isAddingTask, setAddTask] = useState(false);

  const handleClosing = async (e) => {
    await fetch(
      "http://localhost:3001/project/checkComplete/" + sample_project._id + "/",
      {
        method: "POST",
        headers: {
          "x-api-key": user.email,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        setNumCompleted(responseJSON?.completedProjects);
      });

    handleClose(e);
  };

  const handleClose = (e) => {
    setOpenDialog(false);
    e.stopPropagation();
    setRefresh(!refresh);
  };

  const handleEditClose = (e) => {
    setOpenEditDialog(false);
    setOpenDialog(true);
    e.stopPropagation();
  };
  const handleEditProjectDialog = (e) => {
    setOpenDialog(false);
    setOpenEditDialog(true);
    e.stopPropagation();
  };
  const handleAddTask = () => {
    setAddTask(true);
  };

  // ------ HANDLERS

  const handleEditTaskCompletion = async (completed, taskId) => {
    const response = await fetch("http://localhost:3001/task/" + taskId + "/", {
      method: "PATCH",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        completed,
      }),
    });
    const response2 = await fetch("http://localhost:3001/user", {
      method: "PATCH",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        points: completed ? user_model.points + 1 : user_model.points,
      }),
    });

    setPoints(completed ? user_model.points + 1 : user_model.points);
    setRefresh(!refresh);
  };
  const handleEditTaskDate = async (dueDate, taskId) => {
    dueDate = new Date(dueDate.replace(" ", "T")).toISOString();
    const response = await fetch("http://localhost:3001/task/" + taskId + "/", {
      method: "PATCH",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        dueDate,
      }),
    });
    setRefresh(!refresh);
  };
  const handleDeleteTask = async (taskId) => {
    const response = await fetch("http://localhost:3001/task/" + taskId + "/", {
      method: "DELETE",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
    });
    setRefresh(!refresh);
  };

  const [taskName, setNewTaskName] = useState("");
  const [dueDate, setNewTaskDate] = useState(newDate.getHours().toString());
  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:3001/task/", {
      method: "POST",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName,
        dueDate,
        completed: false,
        priority: "HIGH",
        relatedProject: project._id,
      }),
    });
    setRefresh(!refresh);
    setAddTask(false);
    setNewTaskName("");
  };

  const [projectNameChanged, setChangeProjectName] = useState("");
  const [dueDateChanged, setChangedProjectDate] = useState(
    newDate.getHours().toString()
  );
  const handleEditProject = async () => {
    const response = await fetch(
      "http://localhost:3001/project/" + project._id + "/",
      {
        method: "PATCH",
        headers: {
          "x-api-key": user.email,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dueDate: dueDateChanged,
          projectName: projectNameChanged,
        }),
      }
    );

    setRefresh(!refresh);
    handleEditClose();
    setChangeProjectName("");
  };
  const handleCompleteProject = async () => {
    tasks.forEach(async ({ _id: taskId }) => {
      const response = await fetch(
        "http://localhost:3001/task/" + taskId + "/",
        {
          method: "PATCH",
          headers: {
            "x-api-key": user.email,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: true,
          }),
        }
      );
    });

    const response2 = await fetch("http://localhost:3001/user", {
      method: "PATCH",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
      body: JSON.stringify({
        points: user_model.points + tasks.length,
      }),
    });
    setPoints(user_model.points + tasks.length);

    setRefresh(!refresh);
  };
  const handleDeleteProject = async (e) => {
    const response = await fetch(
      "http://localhost:3001/project/" + project._id,
      {
        method: "DELETE",
        headers: {
          "x-api-key": user.email,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        setNumCompleted(responseJSON?.completedProjects);
      });
    setRefresh_list(!refresh_list);
    handleClose(e);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#2F0E5A",
        width: "13em",
        height: "13em",
        borderRadius: "10%",
        padding: 1,
        cursor: "pointer",
      }}
      onClick={() => setOpenDialog(true)}
    >
      <Typography variant="h5" color="white" noWrap>
        {title}
      </Typography>
      <Typography color="white">Deadline: {goalDate}</Typography>
      <Box
        sx={{
          height: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BorderLinearProgress variant="determinate" value={progress * 100} />
      </Box>
      <Dialog
        open={openDialog}
        onBackdropClick={handleClosing}
        fullWidth
        maxWidth="md"
        xs={{ padding: 2 }}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          style: {
            backgroundColor: "#2F0E5A",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <DialogTitle sx={{ flex: 1 }}>{title}</DialogTitle>
          <IconButton sx={{ color: "white" }} onClick={handleClosing}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ width: "100%", background: "white" }} />
        <DialogContent>
          <Typography sx={{ marginBottom: 1 }}>
            <b>Target Deadline: </b>
            {goalDate}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Typography sx={{ marginBottom: 1, flex: 1 }}>
              <b>Tasks:</b>
            </Typography>
          </Box>
          {!!tasks &&
            tasks.map(
              (
                {
                  taskName: name,
                  completed: isComplete,
                  dueDate: targetDate,
                  _id: taskId,
                },
                index
              ) => {
                let temp = targetDate?.split("T");
                let inputDate = temp?.[0] + " " + temp?.[1]?.split(".")?.[0];
                return (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    key={index}
                  >
                    <Checkbox
                      checked={isComplete}
                      sx={{ color: "white" }}
                      onChange={() =>
                        handleEditTaskCompletion(!isComplete, taskId)
                      }
                    ></Checkbox>
                    <Typography sx={{ flex: 1 }}>{name}</Typography>
                    <Typography sx={{ paddingRight: 2 }}>
                      Target Deadline:{" "}
                    </Typography>
                    <TextField
                      sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      variant="standard"
                      type="datetime"
                      defaultValue={inputDate}
                      onChange={(event) => {
                        handleEditTaskDate(event.target.value, taskId);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton
                      sx={{ color: "white" }}
                      onClick={() => handleDeleteTask(taskId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              }
            )}
          {isAddingTask && (
            <>
              <Typography>
                {" "}
                <b>Create A New Task:</b>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  p: 0.5,
                }}
              >
                <TextField
                  label="Task Name"
                  sx={{
                    backgroundColor: "white",
                    flexGrow: 1,
                    borderRadius: "5px",
                    m: 1,
                  }}
                  InputProps={{ disableUnderline: true }}
                  onChange={(event) => {
                    setNewTaskName(event.target.value);
                  }}
                />
                <TextField
                  onChange={(event) => {
                    setNewTaskDate(event.target.value);
                  }}
                  label="Task deadlines"
                  sx={{ backgroundColor: "white", borderRadius: "5px", m: 1 }}
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ disableUnderline: true }}
                />
                <Button onClick={() => setAddTask(false)}>Cancel</Button>
                <Button type="submit" onClick={handleCreateTask}>
                  Create Task
                </Button>
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingTop: isAddingTask ? 1 : 0,
            }}
          >
            <Typography sx={{ marginBottom: 1 }}>
              <b>Progress: </b>
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={progress * 100}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: "28px" }}
            onClick={handleAddTask}
            size="small"
          >
            Add a task
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleEditProjectDialog}
            size="small"
          >
            Edit Project
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleCompleteProject}
            size="small"
          >
            Complete Project
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px", backgroundColor: "red" }}
            onClick={handleDeleteProject}
            size="small"
          >
            Delete Project
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onBackdropClick={handleEditClose}
        fullWidth
        maxWidth="sm"
        xs={{ padding: 2 }}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          style: {
            backgroundColor: "#2F0E5A",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <DialogTitle sx={{ flex: 1 }}>Editing: {title}</DialogTitle>
          <IconButton sx={{ color: "white" }} onClick={handleEditClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ width: "100%", background: "white" }} />
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ paddingRight: 2, flex: 1 }}>
              <b>Change Target Deadline: </b>
            </Typography>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              variant="standard"
              type="datetime-local"
              defaultValue={goalDate}
              onChange={(event) => {
                setChangedProjectDate(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <Typography sx={{ paddingRight: 2, flex: 1 }}>
              <b>Rename Project: </b>
            </Typography>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              variant="standard"
              defaultValue={title}
              onChange={(event) => {
                setChangeProjectName(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleEditClose}
            size="small"
          >
            Cancel Changes
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "28px" }}
            onClick={handleEditProject}
            size="small"
          >
            Done making Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ProjectCard;
