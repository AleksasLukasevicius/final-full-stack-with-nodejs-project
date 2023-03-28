import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Grid
      component="main"
      container
      direction="column"
      alignItems="center"
      margin="0 auto"
    >
      <Outlet />
    </Grid>
  );
};
