import {
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateCourse = () => {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthContext();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData(); // Use FormData to handle files
    payload.append("title", title);
    payload.append("description", description);
    payload.append("avatar", banner); // Append the banner file

    console.log(payload);

    const response = await fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: payload, // Send the FormData object
    });

    const data = await response.json();
    console.log(data.message);
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" style={{ marginBottom: 40 }}>
            <Typography>Create New Course</Typography>
          </Grid>
          <TextField
            label="Title"
            style={{ marginBottom: 20 }}
            placeholder="Enter the title"
            fullWidth
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            placeholder="Enter a description"
            style={{ marginBottom: 30 }}
            fullWidth
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="file"
            placeholder="bannerImage"
            onChange={(e) => setBanner(e.target.files[0])}
          ></Input>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreateCourse;
