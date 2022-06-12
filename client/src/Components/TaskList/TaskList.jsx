import { Button, Stack, Typography, Box, Input } from "@mui/material";
import { ListItem } from "@mui/material";
import List from "@mui/material/List";
import React, { useState, useEffect, useRef } from "react";
import EstablishedTask from "./Task/EstablishedTask";
import CreateTask from "./Task/CreateTask";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function TaskList({ user, setPoints }) {
  const [tasks, setTasks] = useState([]);
  const [prioritySort, setPrioritySort] = useState("high");
  const [user_model, setUser] = useState([]);
  const [isTaskBeingCreated, toggleTaskBeingCreated] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const resultArray = useRef([]);
  const [result, setResult] = useState(1);

  async function getTasks() {
    await axios
      .get("http://localhost:3001/task", {
        headers: {
          "x-api-key": user?.email,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        setTasks(res.data?.filter(({ relatedProject }) => !relatedProject))
      );
    await axios
      .get("http://localhost:3001/user", {
        headers: {
          "x-api-key": user?.email,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUser(res.data?.[0]));
  }

  useEffect(getTasks, [refresh]);

  async function handleCreate(taskName, completed, priority, dueDate) {
    await axios.post(
      "http://localhost:3001/task",
      {
        taskName: taskName,
        completed: false,
        priority: priority,
        dueDate: dueDate,
      },
      {
        headers: {
          "x-api-key": user.email,
          "Content-Type": "application/json",
        },
      }
    );
    toggleTaskBeingCreated(false);
    setRefresh(!refresh);
  }

  async function handleDelete(taskId) {
    await axios.delete("http://localhost:3001/task/" + taskId, {
      headers: {
        "x-api-key": user.email,
        "Content-Type": "application/json",
      },
    });
    setRefresh(!refresh);
  }

  async function handleUpdate(_id, taskName, completed, priority, dueDate) {
    await axios.patch(
      "http://localhost:3001/task/" + _id,
      {
        taskName: taskName,
        completed: completed,
        priority: priority,
        dueDate: dueDate,
      },
      {
        headers: {
          "x-api-key": user?.email,
          "Content-Type": "application/json",
        },
      }
    );
    setRefresh(!refresh);
  }

  useEffect(() => {
    resultArray.current = [...tasks].map((task) => {
      switch (task?.priority) {
        case "VERY-HIGH":
          return {
            id: 1,
            _id: task._id,
            uid: task.uid,
            priority: task.priority,
            name: task.taskName,
            completed: task.completed,
            dueDate: task.dueDate,
          };
        case "HIGH":
          return {
            id: 2,
            _id: task._id,
            uid: task.uid,
            priority: task.priority,
            name: task.taskName,
            completed: task.completed,
            dueDate: task.dueDate,
          };
        case "MEDIUM":
          return {
            id: 3,
            _id: task._id,
            uid: task.uid,
            priority: task.priority,
            name: task.taskName,
            completed: task.completed,
            dueDate: task.dueDate,
          };
        case "LOW":
          return {
            id: 4,
            _id: task._id,
            uid: task.uid,
            priority: task.priority,
            name: task.taskName,
            completed: task.completed,
            dueDate: task.dueDate,
          };
        default:
          return {
            id: null,
            _id: null,
            uid: null,
            priority: null,
            name: null,
            completed: null,
            dueDate: null,
          };
      }
    });

    resultArray.current = resultArray.current.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
  }, [tasks]);

  const sort = () => {
    if (prioritySort === "high") {
      resultArray.current = resultArray.current.sort((a, b) =>
        a.id > b.id ? 1 : -1
      );
      setPrioritySort("low");
    } else {
      resultArray.current = resultArray.current.sort((a, b) =>
        a.id < b.id ? 1 : -1
      );
      console.log(resultArray.current);
      setPrioritySort("high");
    }
  };
  //console.log(result.sort((a, b) => (a.id > b.id ? 1 : -1)));
  return (
    <div>
      <div
        style={{ display: "inline-flex", width: "auto", marginBottom: "15px" }}
      >
        <Typography color="white" variant="h4">
          My Tasks
        </Typography>
        <Button
          style={{ marginLeft: "20px" }}
          variant="contained"
          size="small"
          ref={setResult}
          onClick={sort}
        >
          Sort By Priority
        </Button>
      </div>
      <List>
        {resultArray.current.map((task) => (
          <ListItem
            key={`task-${task._id}`}
            sx={{ backgroundColor: "#7C238C", border: "1px solid black" }}
          >
            <EstablishedTask
              _id={task._id}
              taskName={task.name}
              completed={task.completed}
              priority={task.priority}
              dueDate={task.dueDate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              user={user}
              user_model={user_model}
              setPoints={setPoints}
              setRefresh={setRefresh}
              refresh={refresh}
            ></EstablishedTask>
          </ListItem>
        ))}
        <ListItem>
          {isTaskBeingCreated ? (
            <CreateTask
              handleCreate={handleCreate}
              dueDate={new Date().toLocaleDateString()}
              completed={false}
            ></CreateTask>
          ) : (
            <Button
              style={{ color: "#45c0c4" }}
              onClick={() => {
                toggleTaskBeingCreated(true);
              }}
            >
              <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
            </Button>
          )}
        </ListItem>
      </List>
    </div>
  );
}
