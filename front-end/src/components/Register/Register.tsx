import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../EventsContext";

export const Register = () => {
  // const { events, dispatch } = useContext(EventsContext);
  const [value, setValue] = useState<Dayjs | null>(dayjs("YYYY-MM-DD"));
  const [userName, setUserName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<
    string | number | readonly string[] | undefined
  >("2022-07-26");
  const [age, setAge] = useState<number>(0);
  const [events, setEvents] = useState<string[]>([]);
  const [event_id, setEvent_id] = useState<number>(0);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const eventName = events.map((event: any) => event.userName);

  const handleEventChange = (event: any, value: any) => {
    const selectedEvent = events.find((event: any) => event.userName === value);

    const getEventIdName = (value: any) => {
      const eventId = value.id;
      const eventName = value.userName;

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
  }, [userName, lastName, email, birthdate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
          userName,
          lastName,
          email,
          birthdate,
          event_id,
          event_name: selectedEventName,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
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
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              aria-label="user lastname input"
              label="Last Name"
              required
              variant="standard"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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
              id="combo-box-demo"
              options={eventName}
              onChange={handleEventChange}
              renderInput={(params) => <TextField {...params} label="Events" />}
            />
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              // onClick={() =>
              //   dispatch({ type: "add-event", payload: { eventId: 1 } })
              // }
            >
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
