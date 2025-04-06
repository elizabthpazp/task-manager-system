import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";  

const Navbar = () => {
  const location = useLocation();  
  const navigate = useNavigate();  

  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "lightPurple", borderRadius: "15px" }}>
      <Toolbar>
        <Typography fontFamily="sans-serif" variant="inherit" sx={{ flexGrow: 1 }}>
          TASK MANAGER
        </Typography>
 
        {location.pathname !== "/" && (
          <Button color="inherit" component={Link} to="/">
            Tasks
          </Button>
        )}
        
        {location.pathname !== "/dashboard" && (
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        )}
 
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

