import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);


  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        const incidentList = await axios.get(
          "http://localhost:3001/api/incidents",
          { withCredentials: true }
        );
        setIncidents(incidentList.data.result);
      }
    }

    fetchData();
  }, [isLogged]);

  const handleDelete = async (sys_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this incident?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });

      // Update UI instantly
      setIncidents((prev) => prev.filter((inc) => inc.sys_id !== sys_id));

      alert("Incident deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete incident.");
    }
  };

  return (
    <>
      {isLogged && incidents ? (
        <>
          <Stack spacing={3}>
            <Typography variant="h5">Incident Records:</Typography>

            <Grid container spacing={5} justifyContent={"space-around"}>
              {incidents.map((inc, index) => {
                return (
                  <Grid key={inc.sys_id}>
                    <Card sx={{ width: 300, height: 200 }}>
                      <CardContent>
                        <Typography variant="h6">
                          Incident #: {inc.number}
                        </Typography>
                        <Typography variant="body2">
                          Description: {inc.short_description}
                        </Typography>
                        <Typography variant="body2">
                          State: {inc.state}
                        </Typography>
                        <Typography variant="body2">
                          Priority: {inc.priority}
                        </Typography>
                        <Button
                          sx={{ mt: 1 }}
                          variant="contained"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ mt: 1, mx: 1 }}
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(inc.sys_id)}
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
