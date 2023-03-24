import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";

export const Users = () => {
  //   const { users, dispatch } = useContext(UsersContext);

  return (
    <Grid>
      <Typography variant="h1">Users</Typography>
      <Button
        variant="contained"
        // onClick={() => dispatch({ type: "add-user", payload: { userId: 1 } })}
      >
        Add User
      </Button>
    </Grid>
  );
};
