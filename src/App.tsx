import { Grid } from "@mui/material";
import { useReducer } from "react";
import { EventsContext, Footer, MainRouter } from "./components";
import { eventsReducer } from "./components/EventsContext/EventsReducer";

export const App = () => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
  });

  return (
    <Grid component="main" container>
      <EventsContext.Provider value={{ ...state, dispatch }}>
        <MainRouter />
      </EventsContext.Provider>
      <Footer />
    </Grid>
  );
};
