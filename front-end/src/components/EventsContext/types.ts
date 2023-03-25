import { Dispatch } from "react";

export type TEvent = {
  id: number;
  name: string | null;
  event_date: string | null;
  location?: string | null;
  description?: string | null;
  image?: string;
};

export type TEventsContext = {
  events: Readonly<TEvent[]>;
  dispatch: Dispatch<TEventsAction>;
};

export type TEventsAction = {
  type: "add-event" | "delete-event" | "set-event";
  payload: {
    eventId?: number;
  };
};

export type TEventsState = {
  events: Readonly<TEvent[]>;
};
