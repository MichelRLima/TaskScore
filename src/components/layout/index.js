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
  ListItemText,
  ListItemIcon,
  List,
  ListItemButton,
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
  MenuOutlined,
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
  const [openMenu, setOpenMenu] = useState(false);
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
      window.location.href = "/"; // Redireciona e recarrega a página
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

  const toggleDrawerMenu = (newOpen) => () => {
    setOpenMenu(newOpen);
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
        {windowWidth <= 725 && (
          <IconButton onClick={() => setOpenMenu(true)} sx={styles.iconButton}>
            <MenuOutlined sx={styles.iconMore} fontSize="small" />
          </IconButton>
        )}
        <Button onClick={() => navigate("/")}>
          <Box sx={{ width: 130, height: 80 }}>
            <img
              src="/iconTaskScoreTwo.png" // Caminho correto para a pasta public
              alt="Minha Imagem"
              style={styles.containerImage}
            />
          </Box>
        </Button>
        {windowWidth > 725 && (
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
              icon={<DashboardCustomizeOutlined />}
              iconPosition="start"
              label={windowWidth > 725 ? "Flashcards" : ""}
              onClick={() => navigate("/flashcards")}
            />
          </Tabs>
        )}

        <IconButton onClick={() => setOpen(true)} sx={styles.iconButton}>
          <SettingsOutlined sx={styles.iconMore} fontSize="small" />
        </IconButton>

        <Drawer anchor="left" open={openMenu} onClose={toggleDrawerMenu(false)}>
          <Box sx={styles.boxDrwaer}>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton sx={{}} onClick={() => setOpenMenu(false)}>
                <ArrowBackIosNewOutlined />
              </IconButton>
            </Box>

            <Divider />
            <List component="nav" sx={styles.list}>
              <ListItemButton
                selected={window.location.pathname === "/"}
                onClick={() => {
                  navigate("/");
                  setOpenMenu(false);
                }}
              >
                <ListItemIcon>
                  <LibraryBooksOutlined />
                </ListItemIcon>
                <ListItemText primary="Concursos" />
              </ListItemButton>

              <ListItemButton
                selected={window.location.pathname === "/flashcards"}
                onClick={() => {
                  navigate("/flashcards");
                  setOpenMenu(false);
                }}
              >
                <ListItemIcon>
                  <DashboardCustomizeOutlined />
                </ListItemIcon>
                <ListItemText primary="Flashcards" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={styles.boxDrwaerConfig}>
            <IconButton onClick={() => setOpen(false)}>
              <ArrowForwardIosOutlined />
            </IconButton>
            <Divider />
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
              <Box sx={styles.boxDataSystem}>
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
