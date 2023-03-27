import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../utils/getEvents";
import { EventsTable } from "./EventsTable";
import type { TEvents } from "./types";

export const Events = () => {
  // const { events, dispatch } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [events, setEvents] = useState<TEvents[]>([]);

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
