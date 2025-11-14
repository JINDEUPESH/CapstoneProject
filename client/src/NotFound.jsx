import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Back Home
      </Button>
    </Box>
  );
}
