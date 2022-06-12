import { Grid, List, ListItem } from "@mui/material";
import { Stack, Box, Card } from "@mui/material";
import TaskList from "../TaskList/TaskList";
import WidgetsPannel from "../WidgetsPannel/WidgetsPannel";
import ProjectCard, { AddProjectDialog } from "../Project/Project";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import WeatherWidget from "../Weather/WeatherWidget";
import Notifications from "../Notifications/Notifications";

const Dashboard = ({ user, setPoints, completedProjects, setNumCompleted }) => {
  const [refresh, setRefresh] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/project/", {
      method: "GET",
      headers: { "x-api-key": user.email, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setProjects(responseJSON);
      });
  }, [refresh]);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{ display: "flex", width: "80%", paddingRight: "10px" }}
        >
          <Grid item xs={12}>
            <Notifications />
            <WeatherWidget />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <AddProjectDialog
                setRefresh={setRefresh}
                refresh={refresh}
                user={user}
              />
            </Box>
            <List
              component={Stack}
              direction="row"
              sx={{ overflowX: "scroll", overflowY: "hidden" }}
            >
              {projects.map((project, index) => (
                <ListItem key={project._id} sx={{ paddingLeft: !index == 0 }}>
                  <ProjectCard
                    sample_project={project}
                    user={user}
                    setPoints={setPoints}
                    setNumCompleted={setNumCompleted}
                    setRefresh_list={setRefresh}
                    refresh_list={refresh}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#2F0E5A",
                width: "100%",
                borderRadius: "20px",
                padding: 2,
              }}
            >
              <TaskList user={user} setPoints={setPoints} />
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", width: "20%" }}>
          <WidgetsPannel completedProjects={completedProjects} user={user} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
