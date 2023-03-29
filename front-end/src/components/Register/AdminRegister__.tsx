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
import { useEffect, useState, FormEventHandler } from "react";

export const AdminRegister = () => {
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [userData, setUserData] = useState({ admin_name: "", password: "" });
  const handleUserDataChange = (
    value: string,
    key: "admin_name" | "password"
  ) => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  console.log(userData);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const { admin_name, password } = userData;

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [userData]);

  const setUsername = (name: string) => {
    setUserData({ ...userData, admin_name: name });
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
            <FormControl fullWidth>
              <InputLabel htmlFor="admin_name">Admin name</InputLabel>
              <Input
                id="admin_name"
                type="text"
                value={admin_name}
                onChange={(e) =>
                  handleUserDataChange(e.target.value, "admin_name")
                }
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  handleUserDataChange(e.target.value, "password")
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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
