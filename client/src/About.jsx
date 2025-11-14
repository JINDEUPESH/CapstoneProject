import { Typography, Box } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: "background.paper",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        About Incident Management 
      </Typography>
      <Typography variant="body1">
        This platform helps you manage ServiceNow incidents with style — built
        using React + MUI, reimagined with neon glass UI.
      </Typography>
    </Box>
  );
}
