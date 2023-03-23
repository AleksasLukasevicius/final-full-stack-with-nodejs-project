import { createContext } from "react";
import { TEventsContext } from "./types";

const INITIAL_VALUE = {
  events: [],
  dispatch: () => {},
} as const;

export const EventsContext = createContext<TEventsContext>(INITIAL_VALUE);
