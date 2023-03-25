import { useReducer, useState } from "react";
import {
  AuthContext,
  EventsContext,
  eventsReducer,
  MainRouter,
} from "./components";

export const App = () => {
  const [auth, setAuth] = useState("" as string | null | undefined);

  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <EventsContext.Provider value={{ ...state, dispatch }}>
        <MainRouter />
      </EventsContext.Provider>
    </AuthContext.Provider>
  );
};
