import { Dispatch } from "react";

export type TEvent = {
  id: number;
  title: string | null;
  date: string | null;
  location: string | null;
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
    id?: number;
  };
};

export type TEventsState = {
  events: Readonly<TEvent[]>;
};
