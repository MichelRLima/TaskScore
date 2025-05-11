import {
  useTheme,
  Tab,
  Tabs,
  Button,
  IconButton,
  Paper,
  Drawer,
  Typography,
  Divider,
  ButtonGroup,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { Box } from "@mui/system";
import MaterialUISwitch from "../buttonMode";

import { useEffect, useState } from "react";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  DashboardCustomizeOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  LibraryBooksOutlined,
  MenuOpenOutlined,
  QueryStatsOutlined,
  SettingsOutlined,
  SettingsSuggestOutlined,
} from "@mui/icons-material";
export default function Layout(params) {
  const { setColorMode } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [value, setValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const handleDownload = () => {
    setLoading(true);
    const concursos = JSON.parse(localStorage.getItem("concursos")) || [];
    const flashCards = JSON.parse(localStorage.getItem("flashCards")) || [];

    const data = [concursos, flashCards];

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "taskScore.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleUpload = (event) => {
    setLoadingUpload(true);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const [concursos, flashCards] = JSON.parse(content);

        localStorage.setItem("concursos", JSON.stringify(concursos || []));
        localStorage.setItem("flashCards", JSON.stringify(flashCards || []));
      } catch (err) {
        console.error(err);
      }
    };

    reader.readAsText(file);
    setTimeout(() => {
      setLoadingUpload(false);
    }, 2000);
  };

  const triggerFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    input.onchange = handleUpload;
    input.click();
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pages = ["/", "/flashcards"];

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

  const buttons = [
    <Button
      onClick={handleDownload}
      loading={loading}
      color="info"
      startIcon={<FileDownloadOutlined />}
      key="one"
    >
      Download
    </Button>,
    <Button
      loading={loadingUpload}
      onClick={triggerFileInput}
      color="success"
      startIcon={<FileUploadOutlined />}
      key="two"
    >
      Upload
    </Button>,
  ];

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
          {/* <Tab
            sx={styles.tab}
            icon={<QueryStatsOutlined />}
            iconPosition="start"
            label={windowWidth > 725 ? "Metricas" : ""}
            onClick={() => navigate("/metricas")}
          /> */}
          <Tab
            sx={styles.tab}
            icon={<DashboardCustomizeOutlined />}
            iconPosition="start"
            label={windowWidth > 725 ? "Flashcards" : ""}
            onClick={() => navigate("/flashcards")}
          />
        </Tabs>
        {/* 
        <IconButton size="small" onClick={() => setOpen(true)}>
          <MenuOpenOutlined sx={styles.iconMore} fontSize="medium" />
        </IconButton> */}
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          sx={{
            color: "#000", // cor do texto no modo claro
            borderColor: "#ccc", // cor da borda do modo claro
            borderRadius: "10px",
            width: 10,
            "& svg": {
              color: "#fff", // cor do ícone como no modo claro
            },
          }}
        >
          <MenuOpenOutlined sx={styles.iconMore} fontSize="medium" />
        </Button>

        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: "100%", padding: "10px" }}>
            <IconButton onClick={() => setOpen(false)}>
              <ArrowForwardIosOutlined />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              width: {
                xs: "50vw", // em telas pequenas (mobile), 80% da largura da viewport
                sm: 300, // em telas ≥600px, usa 400px fixos
                md: 400, // em telas ≥900px, usa 500px fixos
              },
            }}
          >
            <Paper variant="outlined" sx={{ margin: "10px" }}>
              <Box
                sx={{ display: "flex", padding: "10px", alignItems: "center" }}
              >
                <Typography variant="subtitle2">Tema do sistema:</Typography>
                <MaterialUISwitch
                  defaultChecked
                  onClick={() => setColorMode((prev) => !prev)}
                />
              </Box>
            </Paper>
            <Paper variant="outlined" sx={{ margin: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  padding: "10px",
                  gap: 1,
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle2">Dados do sistema</Typography>
                <ButtonGroup size="small" aria-label="Small button group">
                  {buttons}
                </ButtonGroup>
                <Typography
                  sx={{
                    fontSize: "10px",
                    textAlign: "justify",
                    color: "#a3a3a3",
                  }}
                >
                  Ao selecionar 'Download', você irá baixar os dados do sistema
                  salvos no seu dispositivo atual, permitindo transferi-los para
                  outro dispositivo. Já o botão 'Upload' permite importar esses
                  dados para o novo dispositivo a partir do arquivo baixado.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Drawer>
      </Box>

      <Outlet />
    </>
  );
}
