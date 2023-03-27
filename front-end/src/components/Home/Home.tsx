import { Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <Grid
      container
      component={"main"}
      alignItems="center"
      flexDirection={"column"}
    >
      <Typography variant="h3">Welcome to the Events App</Typography>

      <Grid item component="nav" role="navigation">
        <Typography component={"h2"} textAlign="center">
          Please
          <NavLink to="/login" aria-label="login link">
            <Typography variant="button"> Login </Typography>
          </NavLink>
          or
          <NavLink to="/admin-register" aria-label="admin register link">
            <Typography variant="button"> Register</Typography>
          </NavLink>
        </Typography>
      </Grid>
    </Grid>
  );
};
