import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <Grid>
      <Outlet />

      <Typography variant="h2">Welcome to the Events App</Typography>

      {!auth ? (
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
        </Grid>
      ) : null}
    </Grid>
  );
};
