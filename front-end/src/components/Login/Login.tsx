import { FormEventHandler, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleUserDataChange = (value: string, key: "email" | "password") => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.info(userData);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid component={"main"}>
      <Typography variant="h1">Login</Typography>

      <Grid
        component="form"
        action="submit"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <Grid container component={"fieldset"} border={"none"}>
          <Typography component={"legend"} variant="h2">
            Manager login
          </Typography>

          <TextField
            aria-label="email-input"
            label="Email"
            type="email"
            required
            autoComplete="current-email"
            variant="standard"
            value={userData.email}
            onChange={(event) =>
              handleUserDataChange(event.target.value, "email")
            }
          />

          {/* <TextField
            aria-label="password-input"
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            variant="standard"
            value={userData.password}
            onChange={(event) =>
              handleUserDataChange(event.target.value, "password")
            }
          /> */}

          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              aria-label="password-input"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={userData.password}
              onChange={(event) =>
                handleUserDataChange(event.target.value, "password")
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
