import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
} from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import { useContext } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  margin: "0 1rem",
  fontWeight: 500,
  transition: "0.3s",
};

function App() {
  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
      <>
        <AppBar
          position="fixed"
          sx={{
            background: "rgba(20, 20, 20, 0.5)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0",
          }}
          elevation={0}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Bright Speed 
            </Typography>

            <Box display="flex" alignItems="center">
              {isLogged ? (
                <>
                  <Link to="/" style={linkStyle}>
                    Home
                  </Link>
                  <Link to="/about" style={linkStyle}>
                    About
                  </Link>
                  <Link to="/does-not-exist" style={linkStyle}>
                    404 Test
                  </Link>
                  <Link
                    style={{ ...linkStyle, color: "#FF5C8D" }}
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link style={linkStyle} onClick={login}>
                  Login with ServiceNow
                </Link>
              )}

              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 12, mb: 6 }}>
          <Outlet />
        </Container>
      </>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
