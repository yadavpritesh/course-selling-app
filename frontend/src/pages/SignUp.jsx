import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const navigate = useNavigate();

  const onSignup = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#007FFF" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center" style={{ marginBottom: 20 }}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{ marginTop: 10 }}>Sign Up</h2>
        </Grid>
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 20 }}
          value={username}
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter password"
          style={{ marginBottom: 30 }}
          type={showPass ? "text" : "password"}
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Show password"
          onChange={() => setShowPass(!showPass)}
        />
        <Button
          disabled={isLoading}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={onSignup}
        >
          Sign up
        </Button>
        {/* <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography> */}
        <Typography style={{ marginTop: 8 }}>
          {" "}
          Do you have an account ?{" "}
          <span
            className="text-blue-600 hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
        <Button variant="error" disabled>
          {error}
        </Button>
      </Paper>
    </Grid>
  );
};

export default SignUp;
