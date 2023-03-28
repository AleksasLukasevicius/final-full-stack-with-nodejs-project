import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { UsersTable } from "./UsersTable";

export const Users = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        <Typography variant="h2">Users</Typography>
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
