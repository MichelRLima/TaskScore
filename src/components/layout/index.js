import { useTheme, Tab, Tabs, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { Box } from "@mui/system";
import MaterialUISwitch from "../buttonMode";

import { useEffect, useState } from "react";
import {
  DashboardCustomizeOutlined,
  LibraryBooksOutlined,
  QueryStatsOutlined,
} from "@mui/icons-material";
export default function Layout(params) {
  const { setColorMode } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [value, setValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pages = ["/", "/metricas", "/flashcards"];

  useEffect(() => {
    const pageName = window.location.pathname;
    pages?.map((page, index) => {
      if (pageName?.includes(page)) {
        setValue(index);
      }
    });
  }, [window.location.pathname]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Box sx={styles.containerLayout}>
        <Button onClick={() => navigate("/")}>
          <Box sx={{ width: 130, height: 80 }}>
            <img
              src="/iconTaskScoreTwo.png" // Caminho correto para a pasta public
              alt="Minha Imagem"
              style={styles.containerImage}
            />
          </Box>
        </Button>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={styles.tabs}
        >
          <Tab
            sx={styles.tab}
            icon={<LibraryBooksOutlined />}
            iconPosition="start"
            label={windowWidth > 725 ? "Concursos" : ""}
            onClick={() => navigate("/")}
          />
          <Tab
            sx={styles.tab}
            icon={<QueryStatsOutlined />}
            iconPosition="start"
            label={windowWidth > 725 ? "Metricas" : ""}
            onClick={() => navigate("/metricas")}
          />
          <Tab
            sx={styles.tab}
            icon={<DashboardCustomizeOutlined />}
            iconPosition="start"
            label={windowWidth > 725 ? "Flashcards" : ""}
            onClick={() => navigate("/flashcards")}
          />
        </Tabs>

        <MaterialUISwitch
          sx={{ m: 1 }}
          defaultChecked
          onClick={() => setColorMode((prev) => !prev)}
        />
      </Box>

      <Outlet />
    </>
  );
}
