
import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeContext = createContext();

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f7fa",
                  paper: "rgba(255, 255, 255, 0.8)",
                },
                primary: { main: "#6C63FF" },
                secondary: { main: "#00BFA6" },
                text: { primary: "#2c2c2c" },
              }
            : {
                background: {
                  default: "#0b0c10",
                  paper: "rgba(17, 25, 40, 0.75)",
                },
                primary: { main: "#00BFA6" },
                secondary: { main: "#6C63FF" },
                text: { primary: "#EDEDED" },
              }),
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          h5: { fontWeight: 600 },
          body2: { opacity: 0.9 },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                transition: "0.3s all ease",
                boxShadow:
                  "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0.5px rgba(255,255,255,0.1)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
