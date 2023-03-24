import { useContext } from "react";
import {
  Events,
  EventsContext,
  Footer,
  Users,
  UserEvents,
  Home,
  Header,
  NotFoundPage,
} from "..";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const MainRouter = () => {
  const { events, dispatch } = useContext(EventsContext);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-events" element={<UserEvents />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};
