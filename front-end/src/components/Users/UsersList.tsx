import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/getUsers";
import type { TUsers } from "./types";

export const UsersList = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 160,
    },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    { id: 1, last_name: "Snow", firstName: "Jon", age: 35, update: "update" },
    { id: 2, last_name: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, last_name: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, last_name: "Stark", firstName: "Arya", age: 16 },
    { id: 5, last_name: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, last_name: "Melisandre", firstName: null, age: 150 },
    { id: 7, last_name: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, last_name: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, last_name: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
