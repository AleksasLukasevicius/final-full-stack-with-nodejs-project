import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { UsersList } from "./UsersList";

export const Users = () => {
  //   const { users, dispatch } = useContext(UsersContext);

  return (
    <Grid>
      <Typography variant="h1">Users</Typography>
      <UsersList />
      <Button
        variant="contained"
        // onClick={() => dispatch({ type: "add-user", payload: { userId: 1 } })}
      >
        Add User
      </Button>
    </Grid>
  );
};
