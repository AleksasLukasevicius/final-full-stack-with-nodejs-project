import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "./getEvents";
import type { TEvent } from "./types";

export const EventsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<TEvent[]>([]);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    getEvents(setEvents, setIsLoading);
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event title</TableCell>
            <TableCell>Event data</TableCell>
            <TableCell>Event users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event: TEvent) => {
            return (
              <TableRow hover key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.event_date?.split("T", 1)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClick(event.id)}>
                    Show users
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
