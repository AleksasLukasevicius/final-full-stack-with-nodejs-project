import { Button, Grid, TextField, Typography } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { EventsContext } from "../EventsContext";
import { EventsList } from "./EventsList";

export const Events = () => {
  const { events, dispatch } = useContext(EventsContext);
  const [value, setValue] = useState<Dayjs | null>(dayjs("YYYY-MM-DD"));

  return (
    <Grid
      component="main"
      container
      display="flex"
      direction="column"
      alignItems="right"
      width={300}
      margin="0 auto"
    >
      <Grid item>
        <Typography variant="h1">Events</Typography>
      </Grid>

      <Grid item padding={2}>
        <EventsList />
      </Grid>

      <Grid item padding={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Event Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>
      </Grid>

      <Grid item padding={2}>
        <Button
          variant="contained"
          onClick={() =>
            dispatch({ type: "add-event", payload: { eventId: 1 } })
          }
        >
          Add Event
        </Button>
      </Grid>
    </Grid>
  );
};
