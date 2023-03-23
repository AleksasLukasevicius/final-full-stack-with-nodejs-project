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
  dispatch(): void;
};
