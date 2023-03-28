import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../AuthContext";
import { Events, AddEvent } from "../Events";
import { EventUsers } from "../EventUsers";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Home } from "../Home";
import { LoginAdmin } from "../LoginAdmin";
import { NotFoundPage } from "../NotFoundPage";
import { Register } from "../Register";
import { AdminRegister } from "../Register/AdminRegister";
import { Users } from "../RegisteredUsers/Users";
import { UpdateUser } from "../UpdateUser";
import { Layout } from "./Layout";

export const MainRouter = () => {
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
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UpdateUser />} />
            <Route path="/events" element={<Events />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/events/:id" element={<EventUsers />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Grid>
  );
};
