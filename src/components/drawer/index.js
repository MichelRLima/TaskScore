import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import useStyles from "./styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  BookmarkBorderOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  Style,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MaterialUISwitch from "../buttonMode";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer(props) {
  const {
    bodyComponent = <>teste</>,
    setColorMode,
    handleDownload,
    triggerFileInput,
    windowWidth,
    pages = [],
  } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const pageName = window.location.pathname;
    pages?.map((page, index) => {
      if (pageName?.includes(page)) {
        setValue(index);
      }
    });
  }, [window.location.pathname]);

  const styles = useStyles(theme);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const buttons = [
    <Button
      onClick={handleDownload}
      color="info"
      startIcon={open && <FileDownloadOutlined />}
      key="one"
    >
      {open ? "Download " : <FileDownloadOutlined />}
    </Button>,
    <Button
      onClick={triggerFileInput}
      color="success"
      startIcon={open && <FileUploadOutlined />}
      key="two"
    >
      {open ? "Upload " : <FileUploadOutlined />}
    </Button>,
  ];

  const menuIconDrawer = [
    { text: "Concursos", icon: <BookmarkBorderOutlined />, link: "/" },
    { text: "FlashCards", icon: <Style />, link: "/flashcards" },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (windowWidth < 710) {
      setOpen(false);
    }
  }, [windowWidth]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={styles.containerComponent}>
          {/* Botão à esquerda */}

          {windowWidth > 710 ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 2,
                  zIndex: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpenDrawer(true);
              }}
              edge="start"
              sx={[
                {
                  marginRight: 2,
                  zIndex: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={styles.containerImg}>
            <img
              src="/iconTaskScoreTwo.png"
              alt="Minha Imagem"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {windowWidth > 709 ? (
        <Drawer variant="permanent" open={open} sx={{ overflowX: "hidden" }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuIconDrawer.map((menu, index) => (
              <ListItem key={menu} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  selected={pages[value] === menu?.link}
                  sx={[
                    {
                      minHeight: 48,
                      margin: "0 auto",
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                  ]}
                  onClick={() => navigate(menu.link)}
                >
                  <Box
                    sx={
                      !open
                        ? {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }
                        : {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }
                    }
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {},
                      ]}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography fontSize={open ? "1rem" : "8px"}>
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
              justifyContent: open ? "space-between" : "center",
            }}
          >
            {open && (
              <Typography sx={{ fontSize: "0.85rem", color: "#a3a3a3" }}>
                Tema
              </Typography>
            )}

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
          {open && (
            <Paper variant="outlined" sx={styles.paperDescription}>
              <Typography sx={styles.description}>
                Ao selecionar 'Download', você irá baixar os dados do sistema
                salvos no seu dispositivo atual, permitindo transferi-los para
                outro dispositivo. Já o botão 'Upload' permite importar esses
                dados para o novo dispositivo a partir do arquivo baixado.
              </Typography>
            </Paper>
          )}
        </Drawer>
      ) : (
        <></>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {bodyComponent}
      </Box>
    </Box>
  );
}
