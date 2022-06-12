import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/system";
import { SidebarIdentifiers } from "../../identifiers/identifiers";

export const drawerWidth = 240;

/**
 * SIDEBAR
 *
 * This component represents a sidebar component, with code copied from the documentation:
 * https://mui.com/components/drawers
 *
 */

// see here: https://mui.com/styles/api/#makestyles-styles-options-hook
const useStyles = makeStyles({
  sideBarMenu: {
    backgroundColor: "#0b0424",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
});

function Sidebar({ setPage, user, points }) {
  const { logout } = useAuth0();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    logout({ returnTo: window.location.origin });
  };
  const newDate = new Date();
  const time = newDate.getHours();

  const classes = useStyles();
  const drawer = (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography variant="h4" align="center" mt="10%" mb="25%">
        {" "}
        Planner's Paradice
      </Typography>
      <Avatar sx={{ height: `5em`, width: `5em` }} src={user.picture}></Avatar>
      <Typography mt="2%" variant="h5">
        {user.nickname}
      </Typography>
      <ButtonBase onClick={handleSignOut}>
        <Typography>Sign Out</Typography>
      </ButtonBase>

      <List sx={{ marginTop: "25%" }}>
        {[
          { text: "Dashboard" },
          { text: "Analytics" },
          { text: "Notes" },
          { text: "Widgets" },
          { text: "Settings" },
        ].map(({ text }, index) => (
          <ListItem
            button
            color="inherit"
            key={text}
            onClick={() => setPage(index)}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "0b0424",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: "100%" }}>
            <Stack
              direction="row"
              spacing={2}
              // justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Stack>
                <Typography variant="h3" noWrap component="div">
                  {time < 12
                    ? "Good Morning,"
                    : time < 18
                    ? "Good Afternoon,"
                    : "Good Evening,"}{" "}
                  {user.nickname}!
                </Typography>
                <Typography>{newDate.toDateString()}</Typography>
              </Stack>
              <Stack alignItems="flex-end" sx={{ width: "100%" }}>
                <Typography fontSize={36}>
                  <strong>{points}</strong> points
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        id={SidebarIdentifiers.SIDEBAR_CONTAINER}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.sideBarMenu,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.sideBarMenu,
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default Sidebar;
