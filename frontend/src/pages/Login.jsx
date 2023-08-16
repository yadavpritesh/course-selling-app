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
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(username, password);
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
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" style={{ marginBottom: 20 }}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginTop: 10 }}>Login</h2>
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography style={{ marginTop: 8 }}>
            {" "}
            {`Don't have an account ?`}{" "}
            <span
              className="text-blue-600 hover:cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </Typography>
          <Button disabled>{error}</Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
