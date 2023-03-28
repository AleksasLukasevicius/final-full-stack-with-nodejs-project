import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../RegisteredUsers/getUsers";
import { TUsers } from "../RegisteredUsers/types";
import { UsersTable } from "../RegisteredUsers/UsersTable";

export const Users = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  return (
    <Grid
      component="main"
      container
      display="flex"
      direction="column"
      alignItems="center"
      margin="0 auto"
    >
      <Grid item>
        <Typography variant="h2">Users YYY</Typography>
      </Grid>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid>
          <UsersTable />
        </Grid>
      )}
    </Grid>
  );
};
