import { Box } from "@mui/system";
import FlashCardComponent from "../../components/flashCardComponent";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Snackbar,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  AddOutlined,
  Clear,
  DeleteOutlineOutlined,
  Edit,
  ExpandMore,
  MoreVertOutlined,
  Search,
} from "@mui/icons-material";
import AddColecoesFlashCards from "../../components/addColecoesFlashCards/index.";
import EditColecao from "../../components/editColecao";
import ModalDelete from "../../components/modalDelete";
export default function FlashCards() {
  const [buscarColecao, setBuscarColecao] = useState("");
  const [colecoes, setColecoes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editColecao, setEditColecao] = useState(null);
  const [anchorElColecao, setAnchorElColecao] = useState(null);
  const [openEditColecao, setOpenEditColecao] = useState(false);
  const [openDeleteModalColecao, setOpenDeleteModalColecao] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const deleteBody = "Você tem certeza que deseja apagar essa coleção?";
  const confirmDelete = "Apagar coleção";
  const theme = useTheme();
  const styles = useStyles(theme);
  const openMenuColecao = Boolean(anchorElColecao);
  const filteredRows = colecoes?.filter((row, index) => {
    row.numero = index;
    return row.nomeColecao
      ?.toLowerCase()
      ?.includes(buscarColecao?.toLowerCase());
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    try {
      const storedColecoes = localStorage.getItem("flashCards");

      if (storedColecoes && storedColecoes !== "undefined") {
        setColecoes(JSON.parse(storedColecoes));
      } else {
        setColecoes([]);
      }
    } catch (error) {
      console.error("Erro ao carregar coleções do localStorage:", error);
      setColecoes([]);
    }
  }, []);

  const handleClickMenuColecao = (e) => {
    e.stopPropagation();
    setAnchorElColecao(e.currentTarget);
  };

  const handleCloseMenuColecao = () => {
    setAnchorElColecao(null);
  };

  const deleteColecao = (id) => {
    setLoadingDelete(true);

    const updatedColecoes = colecoes.filter((colecao) => colecao?.id !== id);

    setColecoes(updatedColecoes);
    localStorage.setItem("flashCards", JSON.stringify(updatedColecoes));
    setLoadingDelete(false);
    handleCloseMenuColecao();

    setOpenDeleteModalColecao(false);
    setSnackbar({
      children: "Concurso deletado!",
      severity: "success",
    });
  };
  return (
    <Box sx={styles.container}>
      <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
        <Typography variant="title">Coleções de flashcards</Typography>
      </Box>
      <Paper variant={"outlined"} sx={styles.containerPaper}>
        <Box sx={styles.containerAcoes}>
          <TextField
            size="small"
            variant="outlined"
            sx={styles.textFieldBuscar}
            label={"Buscar coleção"}
            placeholder="Coleção"
            value={buscarColecao}
            onChange={(e) => setBuscarColecao(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: buscarColecao ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setBuscarColecao("")} edge="end">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          {windowWidth > 725 && (
            <Button
              onClick={() => setOpen(true)}
              startIcon={<AddOutlined />}
              variant="contained"
            >
              Adicionar coleção
            </Button>
          )}
          {windowWidth <= 725 && (
            <Button onClick={() => setOpen(true)} variant="contained">
              <AddOutlined />
            </Button>
          )}
        </Box>

        {Array.isArray(filteredRows) && filteredRows.length > 0 ? (
          filteredRows.map((colecao, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box sx={styles.conatinerAcoesAccordion}>
                  <Typography variant="mySubtitle">
                    {colecao?.nomeColecao}
                  </Typography>
                  <IconButton
                    component="div"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickMenuColecao(e);
                      setEditColecao(colecao);
                    }}
                  >
                    <MoreVertOutlined />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <Divider sx={{ marginBottom: "20px" }} />
              <AccordionDetails>
                <FlashCardComponent
                  key={index}
                  flashCards={colecao.flashcards}
                />
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="subtitle1">
            Nenhuma coleção encontrada
          </Typography>
        )}
      </Paper>
      <Menu
        id="basic-menu"
        anchorEl={anchorElColecao}
        open={openMenuColecao}
        onClose={handleCloseMenuColecao}
      >
        <MenuItem
          onClick={() => {
            setOpenEditColecao(true);
          }}
        >
          {" "}
          <Edit sx={{ marginRight: "10px" }} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => setOpenDeleteModalColecao(true)}>
          <DeleteOutlineOutlined sx={{ marginRight: "10px" }} />
          Deletar
        </MenuItem>
      </Menu>
      <EditColecao
        colecoes={colecoes}
        setColecoes={setColecoes}
        setOpen={setOpenEditColecao}
        open={openEditColecao}
        editColecao={editColecao}
        setSnackbar={setSnackbar}
      />
      <AddColecoesFlashCards
        open={open}
        setOpen={setOpen}
        colecoes={colecoes}
        setColecoes={setColecoes}
        setSnackbar={setSnackbar}
      />
      <ModalDelete
        openDeleteModal={openDeleteModalColecao}
        deleteLoad={loadingDelete}
        setOpenDeleteModal={setOpenDeleteModalColecao}
        execute={() => {
          deleteColecao(editColecao?.id);
        }}
        severity={"error"}
        contentText={deleteBody}
        confirmText={confirmDelete}
      />

      {!!snackbar && (
        <Snackbar
          open
          onClose={() => setSnackbar(null)}
          autoHideDuration={2500}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </Box>
  );
}
