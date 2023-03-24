import { FormEventHandler, useState } from "react";
import { Button } from "@mui/material";

export const Home = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleUserDataChange = (value: string, key: "email" | "password") => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.info(userData);
  };

  return (
    <main>
      <h1>Welcome</h1>
      <h2>Home page</h2>

      <form action="submit" method="post" onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>User registration</legend>

          <label htmlFor="email">e-mail</label>
          <input
            type="email"
            name="email"
            required
            placeholder="enter Your email"
            autoComplete="off"
            value={userData.email}
            onChange={(event) =>
              handleUserDataChange(event.target.value, "email")
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="enter Your password"
            value={userData.password}
            onChange={(event) =>
              handleUserDataChange(event.target.value, "password")
            }
          />

          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </fieldset>
      </form>
    </main>
  );
};
