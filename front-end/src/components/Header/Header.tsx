import { Logo } from "../Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FC, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";

export const Header: FC = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOutClick = () => {
    setAuth("");

    sessionStorage.removeItem("accessToken");
  };

  const handleSignInClick = () => {
    navigate("/");
  };

  return (
    <Grid component="header" container>
      <Grid
        item
        xs={12}
        sm={2}
        display="flex"
        justifyContent="center"
        mt={1}
        mb={1}
      >
        <NavLink aria-label="logo link" to="/">
          <Logo />
        </NavLink>
      </Grid>

      <Grid
        item
        component="nav"
        role="navigation"
        xs={12}
        sm={8}
        display="flex"
        justifyContent="space-evenly"
      >
        <Grid>
          <NavLink to="/register">
            <Typography aria-label="register user link" variant="button">
              New User
            </Typography>
          </NavLink>
        </Grid>

        <Grid>
          <NavLink to="/events">
            <Typography aria-label="events link" variant="button">
              Events
            </Typography>
          </NavLink>
        </Grid>

        <Grid>
          <NavLink to="/users">
            <Typography aria-label="users link" variant="button">
              Users
            </Typography>
          </NavLink>
        </Grid>
      </Grid>

      <Grid
        item
        component="nav"
        xs={12}
        sm={2}
        display="flex"
        justifyContent="space-evenly"
      >
        <NavLink to="/login">
          <Typography
            aria-label="login link"
            variant="button"
            onClick={handleSignInClick}
          >
            Login
          </Typography>
        </NavLink>

        <NavLink to="/">
          {auth ? (
            <Typography
              aria-label="logout link"
              variant="button"
              onClick={handleLogOutClick}
            >
              Log out
            </Typography>
          ) : null}
        </NavLink>
      </Grid>
    </Grid>
  );
};
