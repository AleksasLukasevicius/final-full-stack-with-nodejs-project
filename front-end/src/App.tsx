import { useReducer, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthContext,
  EventsContext,
  eventsReducer,
  MainRouter,
} from "./components";

export const App = () => {
  const [auth, setAuth] = useState("" as string | null | undefined);
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !auth) {
    setAuth(accessToken);
  }

  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <EventsContext.Provider value={{ ...state, dispatch }}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </EventsContext.Provider>
    </AuthContext.Provider>
  );
};
