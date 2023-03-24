import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useReducer } from "react";
import { EventsContext, eventsReducer, MainRouter } from "./components";

export const App = () => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
  });

  return (
    <EventsContext.Provider value={{ ...state, dispatch }}>
      <MainRouter />
    </EventsContext.Provider>
  );
};
