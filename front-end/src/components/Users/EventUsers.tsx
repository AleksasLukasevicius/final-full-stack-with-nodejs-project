import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TUsers } from "./types";

export const EventUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1_000);
      });
  }, [id]);

  return (
    <Grid
      component="main"
      container
      display="flex"
      direction="column"
      alignItems="center"
      margin="0 auto"
    >
      <Grid item>
        <Typography variant="h2">Event users</Typography>
      </Grid>
      <Grid
        display="grid"
        justifyContent="space-around"
        marginTop="50px"
        marginBottom="50px"
        alignItems="center"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Birthday</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody role="loading-message"> Loading...</TableBody>
          ) : (
            <TableBody>
              {users.map((user: any, id: number) => {
                return (
                  <TableRow hover key={id}>
                    <TableCell>{`${user.name} ${user.last_name}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.birthdate.split("T", 1)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </Grid>
    </Grid>
  );
};
