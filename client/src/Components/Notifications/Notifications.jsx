import React from "react";
import { Stack, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

class Notifications extends React.Component {
  state = { open: false };

  constructor(props) {
    super(props);
    this.state = { tasks: [], projects: [] };
    this.day = "null";
    this.taskName = "";
    this.projectName = "";
    // True for project, false for task.
    this.project_or_task = false;
    this.hour = false;
    this.dnd = this.props.dnd;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Checking current tasks for any upcoming due dates.
    fetch("http://localhost:3001/task", {
      method: "GET",
      headers: {
        "x-api-key": this.props.user?.email,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ tasks: responseJSON });
      });

    this.state.tasks.forEach((task) => {
      this.taskName = task.taskName;
      if (task.dueDate === today) {
        this.day = "today";
        if (task.dueDate.getHours() === today.getHours() + 1) {
          this.hour = true;
        }
      } else if (task.dueDate === tomorrow) {
        this.day = "tomorrow";
      }

      if (this.day !== "null") {
        this.handleOpen();
        this.render();
        this.day = "null";
        this.hour = false;
      }
    });

    // Checking current PROJECTS for any upcoming due dates.
    fetch("http://localhost:3001/project", {
      method: "GET",
      headers: {
        "x-api-key": this.props.user?.email,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ projects: responseJSON });
      });

    this.state.projects.forEach((project) => {
      this.projectName = project.projectName;
      if (project.dueDate === today) {
        this.day = "today";
        if (project.dueDate.getHours() === today.getHours() + 1) {
          this.hour = true;
        }
      } else if (project.dueDate === tomorrow) {
        this.day = "tomorrow";
      }

      if (this.day !== "null") {
        this.project_or_task = true;
        this.handleOpen();
        this.render();
        this.day = "null";
        // Reset if-clauses for next dueDates check.
        this.hour = false;
        this.project_or_task = false;
      }
    });
  }

  render() {
    return (
      <Stack spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Collapse in={this.state.open && this.props.dnd}>
            <Alert
              variant="filled"
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>REMINDER: Upcoming Task Due Date!</AlertTitle>
              {this.project_or_task ? this.projectName : this.taskName} is due{" "}
              {this.day}
              {this.hour ? " by the next hour" : ""}!
            </Alert>
          </Collapse>
        </Box>
      </Stack>
    );
  }
}

export default Notifications;
