import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEvent } from "../EventsContext/types";
import { getUsers } from "./getUsers";
import type { TUsers } from "./types";
import { UsersList } from "./UsersList";

export const Users = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  const handleDeleteButton = (id: number) => {
    axios
      .delete(`http://localhost:5000/users/${id}`, {
        headers: {
          AuTableCellorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getUsers(setUsers, setIsLoading);
        alert("User deleted");
      })
      .catch((error: any) => console.error(error));
  };

  const handleUpdateButton = (id: number) => {
    navigate(`/user/${id}`);
  };

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
        <Typography variant="h1">Users</Typography>
      </Grid>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Birthday</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Event</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => {
                return (
                  <TableRow
                    sx={{
                      "&:hover": { backgroundColor: "rgb(250, 245, 237)" },
                    }}
                    key={user.id}
                  >
                    <TableCell>{`${user.name} ${user.surname}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.birthdate.split("T", 1)}</TableCell>
                    <TableCell>{user.event_name}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteButton(user.id)}>
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleUpdateButton(user.id)}>
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Grid>
  );
};
