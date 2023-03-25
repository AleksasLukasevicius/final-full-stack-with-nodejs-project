import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" marginTop="auto">
      <Typography
        aria-label="current year"
        variant="h6"
        color="textSecondary"
        align="center"
      >
        {`© ${currentYear} - All rights reserved`}
      </Typography>
    </Box>
  );
};
