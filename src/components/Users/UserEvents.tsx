import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";

export const UserEvents = () => {
  const { dispatch } = useContext(EventsContext);

  return (
    <Grid>
      <Typography variant="h1">User Events</Typography>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "add-event", payload: { eventId: 1 } })}
      >
        Add Event
      </Button>
    </Grid>
  );
};
