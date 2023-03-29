import { Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { Logo } from "../Logo";

export const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    setAuth("");

    sessionStorage.removeItem("accessToken");
  };

  const handleLogInClick = () => {
    navigate("/");
  };

  return (
    <Grid
      component="header"
      container
      alignItems="center"
      mt={2}
      mb={2}
      textTransform="none"
      paddingBottom={1}
      borderBottom={1}
    >
      <Grid item xs={12} sm={3} display="flex" justifyContent="center">
        <NavLink aria-label="logo link" to="/">
          <Logo />
        </NavLink>
      </Grid>

      <Grid
        item
        component="nav"
        role="navigation"
        xs={12}
        sm={7}
        display="flex"
        justifyContent="space-evenly"
      >
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

        <Grid>
          <NavLink to="/register">
            <Typography aria-label="register user link" variant="button">
              New User
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
            onClick={handleLogInClick}
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
