import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";
import { EventsList } from "./EventsList";

export const Events = () => {
  const { events, dispatch } = useContext(EventsContext);

  return (
    <Grid>
      <Typography variant="h1">Events</Typography>
      <EventsList />
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "add-event", payload: { eventId: 1 } })}
      >
        Add Event
      </Button>
    </Grid>
  );
};
