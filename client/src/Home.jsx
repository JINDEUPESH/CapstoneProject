import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [searchNumber, setSearchNumber] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
  });
  const [editing, setEditing] = useState(null); 

  
  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const incidentList = await axios.get(
            "http://localhost:3001/api/incidents",
            { withCredentials: true }
          );
          setIncidents(incidentList.data.result || []);
        } catch (err) {
          console.error("Failed to fetch incidents:", err);
        }
      }
    }
    fetchData();
  }, [isLogged]);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          formData,
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        
        await axios.post("http://localhost:3001/api/incidents", formData, {
          withCredentials: true,
        });
        alert("Incident inserted successfully!");
      }

      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);

      setFormData({ impact: "", urgency: "", short_description: "" });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };

  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });
      setIncidents((prev) => prev.filter((inc) => inc.sys_id !== sys_id));
      alert("Incident deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete incident.");
    }
  };

  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact || "",
      urgency: inc.urgency || "",
      short_description: inc.short_description || "",
    });
    setEditing(inc.sys_id);
  };

  const filteredIncidents = incidents.filter((inc) =>
    searchNumber === "" ||
    inc.number.toLowerCase().includes(searchNumber.toLowerCase())
  );
  

  return (
    <>
      {isLogged && (
        <Stack spacing={3}>
          <Typography variant="h5">Incident Management</Typography>

         
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                select
                label="Impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                size="small"
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="1">1-High</option>
                <option value="2">2-Moderate</option>
                <option value="3">3-Low</option>
              </TextField>

              <TextField
                select
                label="Urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                size="small"
                SelectProps={{ native: true }}
              >
                <option value=""> </option>
                <option value="1">1-High</option>
                <option value="2">2-Moderate</option>
                <option value="3">3-Low</option>
              </TextField>

              <TextField
                label="Short Description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                size="small"
                sx={{ width: 300 }}
              />
              <Button type="submit" variant="contained" color="primary">
                {editing ? "Update Incident" : "Insert Incident"}
              </Button>
              <TextField
            label="Search Incident Number"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            size="small"
            sx={{ width: 250 }}
          />
            </Stack>
          </form>
          
          
         
          <Grid container spacing={3} justifyContent="center">
            
            {filteredIncidents.map((inc) => (
              <Grid key={inc.sys_id} item>
                <Card sx={{ width: 300, height: 200 }}>
                  <CardContent>
                    <Typography variant="h6">
                      Incident #: {inc.number}
                    </Typography>
                    <Typography variant="body2">
                      Description: {inc.short_description}
                    </Typography>
                    <Typography variant="body2">State: {inc.state}</Typography>
                    <Typography variant="body2">
                      Priority: {inc.priority}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEdit(inc)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(inc.sys_id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      {!isLogged && <Typography>Please log in</Typography>}
    </>
  );
}
