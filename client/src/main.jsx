import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider.jsx'
import ThemeProviderWrapper from "./ThemeContext.jsx";

const theme = createTheme({
  palette: {
    mode:'light',
    primary: { main: '#1976d2'},
    secondary: { main: '#7948ecff'}
  }
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProviderWrapper>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProviderWrapper>
</StrictMode>
)
