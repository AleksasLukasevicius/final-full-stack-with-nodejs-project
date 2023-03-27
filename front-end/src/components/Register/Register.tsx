import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<
    string | number | readonly string[] | undefined
  >("2023-04-01");
  const [age, setAge] = useState<number>(0);
  const [events, setEvents] = useState<string[]>([]);
  const [event_id, setEvent_id] = useState<number>(0);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const eventName = events.map((event: any) => event.name);

  console.info("events", events);

  const handleEventChange = (value: any) => {
    const selectedEvent = events.find((event: any) => event.name === value);

    const getEventIdName = (value: any) => {
      const eventId = value.id;
      const eventName = value.name;

      setEvent_id(eventId);
      setSelectedEventName(eventName);
    };

    getEventIdName(selectedEvent);
  };

  const ageCalc = (date: Date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setAge(age);

    return age;
  };

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [name, surname, email, birthdate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const fetchedEvents = res.data;
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/users",
        {
          name,
          surname,
          email,
          birthdate,
          event_id,
          event_name: selectedEventName,
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
          <Typography component="legend" variant="h2" textAlign="center">
            Register new user
          </Typography>

          <Grid item>
            <TextField
              aria-label="user name input"
              label="Name"
              required
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              aria-label="user lastname input"
              label="Last Name"
              required
              variant="standard"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              aria-label="user email input"
              label="User email"
              type="email"
              required
              variant="standard"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Birthdate"
              type="date"
              required
              sx={{ width: 182 }}
              variant="standard"
              inputProps={{
                min: "1900-01-01",
                max: "2020-01-01",
              }}
              value={birthdate}
              onChange={(e) => {
                setBirthdate(e.target.value);
                ageCalc(new Date(e.target.value));
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              label="User age"
              variant="standard"
              required
              type="number"
              value={age}
              disabled
            />
          </Grid>

          <Grid item>
            <Autocomplete
              disablePortal
              options={eventName}
              onChange={handleEventChange}
              renderInput={(params) => <TextField {...params} label="Events" />}
            />
          </Grid>

          <Grid item>
            <Button type="submit" variant="outlined">
              Add User
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {successMsg ? (
        <Typography color="success">Successfully logged in</Typography>
      ) : (
        errorMsg && <Typography color="error">{errorMsg}</Typography>
      )}
    </Grid>
  );
};
