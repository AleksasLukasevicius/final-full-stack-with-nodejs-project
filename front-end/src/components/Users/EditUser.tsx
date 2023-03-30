import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EditUser = () => {
  const [name, setName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<
    string | number | readonly string[] | undefined
  >("2023-04-01");
  const [age, setAge] = useState<number>(0);
  const [event_id, setEvent_id] = useState<number>(0);
  const { id } = useParams();
  const [usersEventName, setUsersEventName] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const setStateValues = (user: any) => {
    setName(user[0].name);
    setLastName(user[0].last_name);
    setEmail(user[0].email);
    setBirthdate(user[0].birthdate.toLocaleString("en-US").split("T", 1));
    setUsersEventName(user[0].event_name);
    setEvent_id(user[0].event_id);
  };

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [name, last_name, email, birthdate]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const fetchedUser = res.data;

        setStateValues(fetchedUser);

        ageCalc(fetchedUser[0].birthdate);
      })
      .catch((error) => console.error(error));
  }, [id]);

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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:5000/users/${id}`,
        {
          name,
          last_name,
          email,
          birthdate,
          event_id,
          event_name: usersEventName,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
          alignItems="center"
          component="fieldset"
          border="none"
          spacing={2}
          width="50rem"
        >
          <Typography component="legend" variant="h2" textAlign="center">
            Edit user
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
              aria-label="user last_name input"
              label="Last Name"
              required
              variant="standard"
              value={last_name}
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
                min: "1923-01-01",
                max: "2013-01-01",
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
            <Button type="submit" variant="outlined">
              Edit User
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {successMsg ? (
        <Typography color="success">User successfully editted.</Typography>
      ) : (
        errorMsg && <Typography color="error">{errorMsg}</Typography>
      )}
    </Grid>
  );
};
