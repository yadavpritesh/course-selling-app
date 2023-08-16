import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Cards(props) {
  const [open, setOpen] = useState(false);
  const [opend, setOpend] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpend = () => setOpend(true);
  const handleClose = () => setOpen(false);
  const handleClosed = () => setOpend(false);
  // const [description, setDescription] = useState(props.description);
  // const [title, setTitle] = useState(props.title);
  const [newTitle, setNewTitle] = useState("");
  const [newDes, setNewDes] = useState("");
  const [price, setPrice] = useState(400);
  // const navigate = useNavigate()
  const id = props.courseId;

  const handleEdit = async () => {
    const payload = {
      title: newTitle,
      description: newDes,
      price: price,
      imageLink: "https:linktoimage.com",
      published: true,
    };
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    // headers.append("Content-Type", "application/json");
    const response = await fetch(`http://localhost:3000/admin/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload(true);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      window.location.reload(true);
    }
  };
  return (
    <Card sx={{ width: 300, height: 330 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          Edit
        </Button>
        <Button size="small" onClick={handleOpend}>
          Delete
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom={4}
          >
            Edit Course Details
          </Typography>
          <form>
            <Stack spacing={4}>
              <TextField
                id="outlined-basic"
                label="Course Name"
                // value={title}
                onChange={(e) => setNewTitle(e.target.value)}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Course Description"
                // value={description}
                onChange={(e) => setNewDes(e.target.value)}
                variant="outlined"
              />
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>

              <Stack direction={"row"} spacing={2}>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" onClick={handleEdit}>
                  Edit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Modal
        open={opend}
        onClose={handleClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You sure you want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 5 }}>
            Please confirm the delete.
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  courseId: PropTypes,
};
