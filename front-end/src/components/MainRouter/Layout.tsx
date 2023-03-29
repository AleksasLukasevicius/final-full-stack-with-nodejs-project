import { Grid, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

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
      {/* 
      <Typography variant="h2">Welcome to the Events App</Typography>

      <Grid item component="nav" role="navigation">
        <Typography textAlign="center">
          Please
          <NavLink to="/login" aria-label="login link">
            <Typography variant="button"> Login </Typography>
          </NavLink>
          or
          <NavLink to="/admin-register" aria-label="admin register link">
            <Typography variant="button"> Register</Typography>
          </NavLink>
        </Typography>
      </Grid> */}
    </Grid>
  );
};
