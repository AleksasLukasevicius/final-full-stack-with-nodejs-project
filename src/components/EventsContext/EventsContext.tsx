import { createContext } from "react";
import { TEventsContext } from "./types";

const INITIAL_VALUE = {
  events: [],
  dispatch: () => {},
} as TEventsContext;

export const EventsContext = createContext<TEventsContext>(INITIAL_VALUE);
