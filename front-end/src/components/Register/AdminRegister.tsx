import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminRegister = () => {
  const [admin_name, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/register-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          admin_name: setUsername,
          password: setPassword,
        }),
      })
      .then((res) => {
        setSuccessMsg(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(true);
      });
  };

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [admin_name, password]);

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
          component="fieldset"
          border="none"
          spacing={2}
          width="50rem"
          justifyContent="center"
        >
          <Typography component="legend" variant="h2" textAlign="center">
            New admin registration
          </Typography>

          <Grid item>
            <FormControl>
              <InputLabel htmlFor="manager name input">Name</InputLabel>
              <Input
                aria-label="manager name input"
                required
                value={admin_name}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard adornment password">
                Password
              </InputLabel>
              <Input
                aria-label="manager password input"
                type={showPassword ? "text" : "password"}
                sx={{ width: 182 }}
                required
                autoComplete="current password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
          </Grid>

          <Grid item>
            <Button variant="outlined">Add Admin</Button>
          </Grid>
        </Grid>
      </Grid>

      {successMsg ? (
        <Typography color="success">Successfully registered in</Typography>
      ) : (
        errorMsg && <Typography color="error">{errorMsg}</Typography>
      )}
    </Grid>
  );
};
