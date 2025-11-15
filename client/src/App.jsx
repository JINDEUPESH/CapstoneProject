import React, { useContext } from 'react'
import { Routes, Route, Outlet, Link as RouterLink } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'
import NotFound from './NotFound.jsx'
import { AppBar, Toolbar, Typography, IconButton, Container, Box } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { AuthContext } from './AuthProvider.jsx'
import { ThemeContext } from './ThemeContext.jsx'


export default function App() {
function Layout() {
const { isLogged, login, logout } = useContext(AuthContext)
const { mode, toggleTheme } = useContext(ThemeContext)


return (
<>
<AppBar
  position="fixed"
  elevation={0}
  sx={{
    backdropFilter: "blur(8px)",
    background: mode === "light"
      ? "rgba(255,255,255,0.8)" // Light glossy effect
      : "rgba(0,0,0,0.3)",      // Dark glossy effect
      color: mode === "light" ? "#000" : "#fff",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }}
>
<Toolbar sx={{ justifyContent: 'space-between' }}>
<Box display="flex" alignItems="center" gap={2}>
<Typography variant="h6" sx={{ fontWeight: 700 }}>BrightSpeed</Typography>
<Typography variant="body2" color="text.secondary">Incident Dashboard</Typography>
</Box>
<Box>
{isLogged ? (
<>
<RouterLink to="/" style={{ textDecoration: 'none', color: mode === "light" ? "#111" : "#fff", marginRight: 16 }}>Home</RouterLink>
<RouterLink to="/about" style={{ textDecoration: 'none', color: mode === "light" ? "#111" : "#fff", marginRight: 16 }}>About</RouterLink>
<a onClick={logout} style={{ cursor: 'pointer', marginRight: 12 }}>Logout</a>
</>
) : (
<a onClick={login} style={{ cursor: 'pointer', marginRight: 12 }}>Login with ServiceNow</a>
)}


<IconButton onClick={toggleTheme} color="inherit" title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
{mode === 'light' ? <Brightness4/> : <Brightness7/>}
</IconButton>
</Box>
</Toolbar>
</AppBar>


<Container maxWidth="xl" sx={{ mt: 12 }}>
<Outlet />
</Container>
</>
)
}


return (
<Routes>
<Route element={<Layout/>}>
<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="*" element={<NotFound/>} />
</Route>
</Routes>
)
}