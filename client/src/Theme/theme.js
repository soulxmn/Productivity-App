/**
 * A theme file that extends the existing theme to add our own colours
 *
 * Only items in the default theme can be customized. See here:
 * https://mui.com/customization/default-theme/
 *
 * Also, we can define our own styles for the built-in MUI components as well
 */

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    // MUI has built in dark mode. See here how to change: https://mui.com/customization/dark-mode/
    // NOTE: if we want a dark mode toggle, we must custom code our own switch
    mode: "light",

    // we can also customize certain colours to use in our components. See here: https://mui.com/customization/palette/
    // primary: {},

    // we can also define a custom background colour. THIS WILL apply to ALL components.
    background: {
      default: "#111135",
    },

    // other things go here
  },

  // customize components
  components: {
    // see how here: https://mui.com/customization/theme-components/
  },
});

export default theme;
