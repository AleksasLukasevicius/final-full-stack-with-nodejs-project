import { type FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export const Login: FC = () => {
  const { setAuth } = useContext(AuthContext);
  const [admin_name, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login-admin", { admin_name, password })
      .then((res) => {
        const accessToken = res.data.accessToken;
        setAuth(accessToken);
        sessionStorage.setItem("accessToken", accessToken);
        setUsername("");
        setPassword("");
        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMsg(true);
        }
      });
  };

  useEffect(() => {
    setErrorMsg(false);
  }, [admin_name, password]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
            Please login
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
            <FormControl>
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
            <Button type="submit" variant="outlined">
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {errorMsg ? (
        <Typography color="error">
          Unsuccessfully logged in. Please enter correct data.
        </Typography>
      ) : null}
    </Grid>
  );
};
