import { ThemeProvider, useMediaQuery, CssBaseline, Box } from "@mui/material";
import "./App.css";

import theme from "./theme";
import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Metricas from "./pages/metricas";
import Concursos from "./pages/concursos";
import Assuntos from "./pages/assuntos";
import FlashCards from "./pages/flashCards";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";
ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
ReactGA.send("pageview");

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [colorMode, setColorMode] = useState(prefersDarkMode);

  const myTheme = useMemo(() => theme(colorMode), [colorMode]);
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Analytics />
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
              <Route path="/flashcards" element={<FlashCards />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
