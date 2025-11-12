import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import { useContext } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
      <>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography>Company Name</Typography>

            <div>
              {isLogged ? (
                <>
                  <Link className={styles.link} to="/">
                    Home
                  </Link>
                  <Link className={styles.link} to="/about">
                    About
                  </Link>
                  <Link className={styles.link} to="/does-not-exist">
                    404 Test
                  </Link>
                  <Link className={styles.link} onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link className={styles.link} onClick={login}>
                  Login with ServiceNow
                </Link>
              )}

              <IconButton
                sx={{ ml: 2 }}
                color="inherit"
                onClick={toggleTheme}
                title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 10 }}>
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
