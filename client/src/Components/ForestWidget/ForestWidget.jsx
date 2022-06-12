import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import { Box, Grid, Stack, Typography } from "@mui/material";
import "./ForestWidget.css";

export default function ForestWidget({ completedProjects }) {
  function renderForest(n) {
    const ret = [];
    for (let i = 0; i < n; i++) {
      ret.push(
        <Grid item xs={2} key={i}>
          <ParkRoundedIcon style={{ color: "green" }}></ParkRoundedIcon>
        </Grid>
      );
    }
    return ret;
  }

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "orange",
        borderRadius: "10%",
        width: "100%",
      }}
    >
      <Stack spacing={4}>
        <Typography
          color="black"
          fontWeight="bold"
          fontSize="25px"
          textAlign="center"
          lineHeight="30px"
        >
          Progress <br /> Forest
        </Typography>
        <Grid container>{renderForest(completedProjects)}</Grid>
      </Stack>
    </Box>
  );
}
