import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProviderWrapper from './ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider.jsx'
// import './index.css'


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