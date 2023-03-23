import { TEventsAction, TEventsState } from "./types";

export const eventsReducer = (state: TEventsState, action: TEventsAction) => {
  switch (action.type) {
    case "set-event":
      console.info("set-event case");
      break;

    case "add-event":
      console.info("add-event case");
      break;

    case "delete-event":
      console.info("delete-event case");
      break;

    default:
      console.info("default case");
  }
  return state;
};
