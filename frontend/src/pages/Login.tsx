import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { TextField, Button, Typography, Container, Box, CircularProgress, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(""); 
  const navigate = useNavigate();  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     
    if (!email || !password) {
      setError("Please, insert both email and password.");
      return;
    }

    setLoading(true); 
    setError("");  

    try {
      const response = await axios.post("https://mm4adbj7u7.execute-api.us-east-2.amazonaws.com/default/task-manager/login", {
        email,
        password,
      });      

      const { token } = response.data;
      localStorage.setItem("token", token); 
      navigate("/");

    } catch (error) {
      console.error("Error en el login:", error);
      setError("Invalid credentials.");
    } finally {
      setLoading(false);   
    }
  };

  return (
    <Container maxWidth="xs" sx={{  mt: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        LogIn
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email" sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "15px" },
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password" sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "15px" },
            }}
          />
        </Box>
        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading} sx={{ height: "50px", borderRadius: "15px" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "LogIn"}
          </Button>
        </Box>
      </form>

      <Box mt={4} textAlign="center">
              <Typography variant="body2">
              Don't have an account?{" "}
                <Link href="/register" variant="body2" sx={{ textDecoration: "none", fontWeight: "bold" }}>
                  Register
                </Link>
              </Typography>
            </Box>
    </Container>
  );
};

export default Login;
