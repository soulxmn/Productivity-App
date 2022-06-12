import { useAuth0 } from "@auth0/auth0-react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import MainApp from "./Components/MainApp/MainApp";
import Notes from "./Components/Notes";
import Widgetstore from "./Components/Widget Store/widgetstore.jsx";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Stack, Typography, Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Timer from "./Components/Clock/Timer";
import Settings from "./Components/Clock/Settings";
import SettingsContext from "./Components/Clock/SettingsContext";
import Notifications from "./Components/Notifications/Notifications";
import Modal from "@mui/material/Modal";
import SignIn from "./Components/SignIn/SignIn";
import theme from "./Theme/theme";

/**
 * THEME PROVIDER
 * ====
 *
 * The theme provider is what's required to use the material ui theme throughout the application.
 *
 * See more here: https://mui.com/customization/theming
 */

// Modal Box Styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1024,
  height: 576,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [page, setPage] = useState(0);
  const [points, setPoints] = React.useState(0);
  const [numCompleted, setNumCompleted] = useState(0);

  React.useEffect(() => {
    fetch("http://localhost:3001/user/", {
      method: "GET",
      headers: { "x-api-key": user?.email, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        // This replaces the endpoint points initialization.
        setPoints(responseJSON?.[0]?.points);
        setNumCompleted(responseJSON?.[0]?.completedProjects);
      });
  }, [user]);
  let content = null;
  if (page === 0) {
    content = (
      <Dashboard
        user={user}
        completedProjects={numCompleted}
        setPoints={setPoints}
        setNumCompleted={setNumCompleted}
      />
    );
  } else if (page === 1) {
    content = <div>W.I.P.</div>;
  } else if (page === 2) {
    content = <Notes user={user} />;
  } else if (page === 3) {
    content = <Widgetstore />;
  } else if (page === 4) {
    content = <div>W.I.P.</div>;
  } else {
    content = <div>W.I.P.</div>;
  }

  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        {/*we are using the custom theme file we have created under ./Theme/theme.js*/}
        {/* All the normal CSS. See here: https://mui.com/components/css-baseline/ */}
        <CssBaseline />
        <Container maxWidth="l">
          <MainApp setPage={setPage} user={user} points={points}>
            {content}
          </MainApp>
        </Container>
      </ThemeProvider>
    );
  } else {
    return <SignIn />;
  }
}

export default App;
