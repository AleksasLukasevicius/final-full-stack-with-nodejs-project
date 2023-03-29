import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsTable } from "./EventsTable";
import { getEvents } from "./getEvents";
import { TEvent, TEvents } from "./types";

export const Events = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    getEvents(setEvents, setIsLoading);
  }, []);

  return (
    <Grid
      component="main"
      container
      display="flex"
      direction="column"
      alignItems="center"
      margin="0 auto"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h2">Events</Typography>
      </Grid>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid>
          <EventsTable />
        </Grid>
      )}
      <Grid item>
        <Button variant="outlined" onClick={() => navigate(`/add-event`)}>
          Add Event
        </Button>
      </Grid>
    </Grid>
  );
};
