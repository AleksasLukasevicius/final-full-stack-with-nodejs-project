import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Grid component={"main"}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page not found</Typography>
    </Grid>
  );
};
