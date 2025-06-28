import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import MiniDrawer from "../drawer";
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosOutlined,
  BookmarkBorderOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  MenuOutlined,
  Style,
} from "@mui/icons-material";
import MaterialUISwitch from "../buttonMode";
export default function Layout(params) {
  const { setColorMode } = params;
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleDownload = () => {
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
    setTimeout(() => {}, 2000);
  };
  const handleUpload = (event) => {
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

  const pages = ["/", "/flashcards"];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pageName = window.location.pathname;
    pages?.map((page, index) => {
      if (pageName?.includes(page)) {
        setValue(index);
      }
    });
  }, [window.location.pathname]);

  const buttons = [
    <Button
      onClick={handleDownload}
      color="info"
      startIcon={<FileDownloadOutlined />}
      key="one"
    >
      {open ? "Download " : <FileDownloadOutlined />}
    </Button>,
    <Button
      onClick={triggerFileInput}
      color="success"
      startIcon={<FileUploadOutlined />}
      key="two"
    >
      {"Upload "}
    </Button>,
  ];

  const menuIconDrawer = [
    { text: "Concursos", icon: <BookmarkBorderOutlined />, link: "/" },
    { text: "FlashCards", icon: <Style />, link: "/flashcards" },
  ];

  return (
    <>
      {windowWidth > 709 ? (
        <MiniDrawer
          setColorMode={setColorMode}
          handleDownload={handleDownload}
          triggerFileInput={triggerFileInput}
          pages={pages}
          value={value}
          windowWidth={windowWidth}
          bodyComponent={
            <>
              <Outlet />
            </>
          }
        />
      ) : (
        <>
          <Toolbar sx={styles.containerComponent}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{
                marginRight: 2,
                zIndex: 2,
              }}
            >
              <MenuOutlined />
            </IconButton>
            <Box sx={styles.containerImg}>
              <img
                src="/iconTaskScoreTwo.png"
                alt="Minha Imagem"
                style={styles.img}
              />
            </Box>
          </Toolbar>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <Box sx={styles.boxDrwaerConfig}>
              <Box sx={styles.boxArrow}>
                <IconButton onClick={() => setOpen(false)}>
                  <ArrowBackIosOutlined />
                </IconButton>
              </Box>

              <Divider />
              <List>
                {menuIconDrawer.map((menu, index) => (
                  <ListItem key={menu} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      selected={pages[value] === menu?.link}
                      sx={styles.boxListIten}
                      onClick={() => navigate(menu?.link)}
                    >
                      <Box sx={styles.boxIcon}>
                        <ListItemIcon sx={styles.listIcon}>
                          {menu.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography fontSize={"1rem"}>
                              {menu?.text}
                            </Typography>
                          }
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box
                sx={{
                  ...styles.containerIconTema,
                }}
              >
                <Typography sx={{ fontSize: "0.85rem", color: "#a3a3a3" }}>
                  Tema:
                </Typography>

                <MaterialUISwitch
                  defaultChecked
                  onClick={() => setColorMode((prev) => !prev)}
                />
              </Box>

              <Divider />
              <ButtonGroup
                sx={styles.buttonGrup}
                orientation="vertical"
                size="small"
                aria-label="Small button group"
              >
                {buttons}
              </ButtonGroup>

              <Paper variant="outlined" sx={styles.paperDescription}>
                <Typography sx={styles.description}>
                  Ao selecionar 'Download', você irá baixar os dados do sistema
                  salvos no seu dispositivo atual, permitindo transferi-los para
                  outro dispositivo. Já o botão 'Upload' permite importar esses
                  dados para o novo dispositivo a partir do arquivo baixado.
                </Typography>
              </Paper>
            </Box>
          </Drawer>
          <Outlet />
        </>
      )}
    </>
  );
}
