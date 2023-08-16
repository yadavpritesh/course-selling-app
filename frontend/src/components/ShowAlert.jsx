import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const ShowAlert = ({ message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

ShowAlert.propTypes;

export default ShowAlert;
