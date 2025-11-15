import React, { createContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'


export const ThemeContext = createContext()


export default function ThemeProviderWrapper({ children }) {
const [mode, setMode] = useState('dark')


const toggleTheme = () => setMode((p) => (p === 'light' ? 'dark' : 'light'))


const theme = useMemo(() => createTheme({
palette: {
mode,
primary: { main: '#6C63FF' },
secondary: { main: '#00E5FF' },
background: {
default: mode === 'light' ? '#F7F9FC' : '#0E0F14',
paper: mode === 'light' ? '#ffffff' : '#111214'
}
},
typography: {
fontFamily: 'Poppins, Inter, sans-serif',
},
components: {
MuiButton: {
styleOverrides: {
root: { borderRadius: 12, textTransform: 'none' }
}
}
}
}), [mode])


return (
<ThemeContext.Provider value={{ mode, toggleTheme }}>
<ThemeProvider theme={theme}>
<CssBaseline />
{children}
</ThemeProvider>
</ThemeContext.Provider>
)
}