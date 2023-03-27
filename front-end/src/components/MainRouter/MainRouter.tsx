import { useContext } from "react";
import {
  Events,
  AddEvent,
  EventsContext,
  Footer,
  Users,
  EventUsers,
  Login,
  Header,
  NotFoundPage,
  Register,
  Home,
} from "..";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRegister } from "../Register/AdmiRegister";
import { UpdateUser } from "../Users";
import { Grid } from "@mui/material";
import { RequireAuth } from "../AuthContext/RequireAuth";

export const MainRouter = () => {
  const { events, dispatch } = useContext(EventsContext);

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={"75vw"}
      minHeight={"100vh"}
      margin={"0 auto"}
    >
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventUsers />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path="/user/:id" element={<UpdateUser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Grid>
  );
};
