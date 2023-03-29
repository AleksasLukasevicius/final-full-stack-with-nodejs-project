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
import { FormEventHandler, useEffect, useState } from "react";

export const AdminRegister = () => {
  const [userData, setUserData] = useState({ admin_name: "", password: "" });

  const handleUserDataChange = (
    value: string,
    key: "admin_name" | "password"
  ) => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  console.info(userData);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/register-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          admin_name: userData.admin_name,
          password: userData.password,
        }),
      })
      .then((res) => {
        console.log(res);
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
  }, [userData]);

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
        container
        direction="column"
        alignItems="center"
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
              <InputLabel htmlFor="manager admin_name input">
                Admin name
              </InputLabel>
              <Input
                aria-label="manager admin_name input"
                required
                value={userData.admin_name}
                onChange={(event) =>
                  handleUserDataChange(event.target.value, "admin_name")
                }
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
