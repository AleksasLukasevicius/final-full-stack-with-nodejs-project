import {
  type FC,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
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
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export const Login: FC = () => {
  const { setAuth } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // const [userData, setUserData] = useState({ name: "", password: "" });
  // const handleUserDataChange = (value: string, key: "name" | "password") => {
  //   setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  // };
  // const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();

  //   console.info(userData);
  // };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/login-admin", { username, password })
      .then((response) => {
        const token = response.data.token;
        setAuth(token);
        sessionStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        setSuccessMsg(true);
        navigate("/register");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          setErrorMsg("Login failed. Incorect username or password.");
        }
      });
  };

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg(false);
  }, [username, password]);

  return (
    <Grid component={"main"}>
      {/* <Typography variant="h1">Login</Typography> */}

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
            aria-label="manager-name-input"
            label="Name"
            required
            autoComplete="current-email"
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
              aria-label="manager-password-input"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
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

          <Button type="submit" variant="outlined">
            Login
          </Button>
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
