import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const AddEvent = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<
    string | number | readonly string[] | undefined
  >("2023-04-01");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [name, date]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/events",
        {
          name,
          event_date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        setSuccessMsg(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(true);
      });
  };

  return (
    <Grid
      component="main"
      container
      direction="column"
      alignItems="center"
      margin="0 auto"
    >
      <Grid item>
        <Typography variant="h2">Add event</Typography>
      </Grid>

      <Grid
        component="form"
        action="submit"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <Grid
          container
          flexDirection="column"
          component="fieldset"
          border="none"
          spacing={2}
          width="50rem"
        >
          <Grid item>
            <TextField
              label="Name"
              variant="standard"
              required
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Event date"
              type="date"
              required
              variant="standard"
              sx={{ width: 182 }}
              inputProps={{
                min: "2021-01-01",
                max: "2050-01-01",
              }}
              value={date ?? ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button variant="outlined" type="submit">
              Add Event
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {successMsg ? (
        <Typography component="p">New event was added</Typography>
      ) : null}

      {errorMsg ? (
        <Typography component="p">
          Register failed. Please check data provided
        </Typography>
      ) : null}
    </Grid>
  );
};
