import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import MiniDrawer from "../drawer";
export default function Layout(params) {
  const { setColorMode } = params;

  const [value, setValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const pages = ["/", "/flashcards"];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MiniDrawer
        setColorMode={setColorMode}
        handleDownload={handleDownload}
        triggerFileInput={triggerFileInput}
        pages={pages}
        value={value}
        windowWidth={windowWidth}
        bodyComponent={
          <>
            {/* <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={styles.boxDrwaerConfig}>
                <IconButton onClick={() => setOpen(false)}>
                  <ArrowForwardIosOutlined />
                </IconButton>
                <Divider />
                <Paper variant={"outlined"} sx={{ margin: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Tema do sistema:
                    </Typography>
                    <MaterialUISwitch
                      defaultChecked
                      onClick={() => setColorMode((prev) => !prev)}
                    />
                  </Box>
                </Paper>
                <Paper variant="outlined" sx={{ margin: "10px" }}>
                  <Box sx={styles.boxDataSystem}>
                    <Typography variant="subtitle2">
                      Dados do sistema
                    </Typography>
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
                      Ao selecionar 'Download', você irá baixar os dados do
                      sistema salvos no seu dispositivo atual, permitindo
                      transferi-los para outro dispositivo. Já o botão 'Upload'
                      permite importar esses dados para o novo dispositivo a
                      partir do arquivo baixado.
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Drawer> */}
            <Outlet />
          </>
        }
      />
    </>
  );
}
