import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { FC, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { EventsContext } from "../EventsContext";

export const Header: FC = () => {
  const { events } = useContext(EventsContext);

  return (
    <Grid
      component="header"
      container
      spacing={1}
      mt={1}
      mb={1}
      alignItems="center"
    >
      <Grid item xs={12} sm={4}>
        <Link to="/">
          <Logo />
        </Link>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Typography variant="h3">your best events</Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Grid
          container
          component="nav"
          role="navigation"
          justifyContent="space-evenly"
          // sx={{
          //   "& a": {
          //     color: "black",
          //     ":hover": { color: "grey" },
          //     textDecoration: "none",
          //   },
          // }}
        >
          <Link to="/">
            <Typography component={"a"} aria-label="login-link" variant="h6">
              Login
            </Typography>
          </Link>
          <Link to="/register">
            <Typography component={"a"} aria-label="register-link" variant="h6">
              Register
            </Typography>
          </Link>
          <Link to="/events">
            <Typography component={"a"} aria-label="products link" variant="h6">
              Events
            </Typography>
          </Link>
          <Link to="/users">
            <Typography component={"a"} aria-label="users-link" variant="h6">
              Users
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
