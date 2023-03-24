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
