import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import Sidebar, { drawerWidth } from "../Sidebar/Sidebar";

function MainApp({ children, setPage, user, points }) {
  
  return (
    <Box sx={{ display: "flex" }} color="white">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Sidebar setPage={setPage} user={user} points={points} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          px: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

MainApp.propTypes = {
  children: PropTypes.any,
};

export default MainApp;
