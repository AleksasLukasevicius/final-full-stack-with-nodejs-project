import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../EventsContext";
import { EventsList } from "./EventsList";
import { getEvents } from "./getEvents";
import type { TEvent, TEvents } from "./types";

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
        <Typography variant="h1">Events</Typography>
      </Grid>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          <Grid
            container
            alignItems="center"
            spacing={2}
            justifyContent="center"
            marginTop="50px"
          >
            <Typography width="150px" variant="h5">
              Name
            </Typography>
            <Typography width="350px" variant="h5">
              Date
            </Typography>
          </Grid>

          {events.map((event: TEvent) => {
            return (
              <Grid
                container
                key={event.id}
                alignItems="center"
                spacing={2}
                margin="20px 10px"
                justifyContent="center"
              >
                <Typography width="250px">{event.name}</Typography>
                <Typography width="250px">
                  {event.event_date?.split("T", 1)}
                </Typography>
                <Button onClick={() => handleClick(event.id)}>
                  Show users
                </Button>
              </Grid>
            );
          })}
        </Box>
      )}
      <Grid item>
        <Button variant="outlined" onClick={() => navigate(`/add-event`)}>
          Add Event
        </Button>
      </Grid>
    </Grid>
  );
};
