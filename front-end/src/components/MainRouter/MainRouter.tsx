import { useContext } from "react";
import {
  Events,
  EventsContext,
  Footer,
  Users,
  UserEvents,
  Login,
  Header,
  NotFoundPage,
  Register,
  Home,
} from "..";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const MainRouter = () => {
  const { events, dispatch } = useContext(EventsContext);

  return (
    <Grid2
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={"75rem"}
      minHeight={"100vh"}
      margin={"0 auto"}
    >
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-events" element={<UserEvents />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Grid2>
  );
};
