import { ThemeProvider, useMediaQuery, CssBaseline, Box } from "@mui/material";
import "./App.css";

import theme from "./theme";
import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Metricas from "./pages/metricas";
import Concursos from "./pages/concursos";
import Assuntos from "./pages/assuntos";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [colorMode, setColorMode] = useState(prefersDarkMode);

  const myTheme = useMemo(() => theme(colorMode), [colorMode]);
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Box
        className="App"
        sx={{ backgroundColor: "background.wallpaper", minHeight: "100vh" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate replace to="/" />} />

            <Route
              element={
                <Layout colorMode={colorMode} setColorMode={setColorMode} />
              }
            >
              <Route exact path="/" element={<Concursos />} />
              <Route path="/metricas" element={<Metricas />} />
              <Route path="/concurso/disciplina/:id" element={<Assuntos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
