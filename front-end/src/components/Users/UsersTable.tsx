import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../RegisteredUsers/getUsers";
import type { TUsers } from "../RegisteredUsers/types";

export const UsersTable = () => {
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
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        getUsers(setUsers, setIsLoading);
      })
      .catch((error: any) => console.error(error));
  };

  const handleUpdateButton = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>XXX Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => {
            return (
              <TableRow hover key={user.id}>
                <TableCell>{`${user.name || ""} ${
                  user.last_name || ""
                }`}</TableCell>
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
                    Edit
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
