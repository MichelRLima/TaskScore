import {
  Alert,
  Breadcrumbs,
  Button,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import {
  AddOutlined,
  Clear,
  LibraryBooksOutlined,
  Search,
} from "@mui/icons-material";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import AddAssunto from "../../components/addAssunto";
import AssuntoComponent from "../../components/assuntoComponent";
import {
  encontrarConcursoPorDisciplina,
  extrairDisciplinas,
} from "../../utils/functions";

export default function Assuntos() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [disciplina, setDisciplina] = useState({});
  const [buscarAssunto, setBuscarAssunto] = useState("");
  const [assuntos, setAssuntos] = useState([]);
  const [concursos, setConcursos] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [concursoName, setConcursoName] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { id } = useParams();
  useEffect(() => {
    const storedConcursos = JSON.parse(localStorage.getItem("concursos"));
    setConcursos(storedConcursos);
    const allDisciplinas = extrairDisciplinas(storedConcursos);
    const disciplina = allDisciplinas?.find((item) => item?.id === id); // ou o id que você quiser
    setAssuntos(disciplina?.assuntos || []);
    setDisciplina(disciplina);
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const concursoId = encontrarConcursoPorDisciplina(concursos, id);
    const concurso = concursos?.find((item) => item?.id === concursoId);
    setConcursoName(concurso?.concurso);
  }, [assuntos]);

  const filteredRows = assuntos?.filter((row, index) => {
    row.numero = index;
    return row.assunto?.toLowerCase()?.includes(buscarAssunto?.toLowerCase());
  });

  const paginatedAssuntos = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const breadcrumbs = [
    <IconButton
      key="home"
      href="/"
      sx={{
        color: "text.primary",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      <LibraryBooksOutlined fontSize="small" />
    </IconButton>,
    <Typography key="concurso" sx={{ color: "text.primary" }}>
      {truncateText(concursoName)}
    </Typography>,
    <Typography key="disciplina" sx={{ color: "text.primary" }}>
      {truncateText(disciplina?.disciplina)}
    </Typography>,
  ];

  return (
    <>
      <Box sx={styles.containerLayout}>
        <Stack spacing={2} sx={{ margin: "0 0 20px 0" }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
          <Typography variant="title">{disciplina?.disciplina}</Typography>
        </Box>
        <Paper variant={"outlined"} sx={styles.containerPaper}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              size="small"
              variant="filled"
              sx={styles.textFieldBuscar}
              label={"Buscar assunto"}
              value={buscarAssunto}
              onChange={(e) => setBuscarAssunto(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: buscarAssunto ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setBuscarAssunto("")} edge="end">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />

            {windowWidth > 725 && (
              <Button
                size="small"
                variant="contained"
                startIcon={<AddOutlined />}
                sx={{ width: "180px" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Adicionar assunto
              </Button>
            )}
            {windowWidth <= 725 && (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <AddOutlined />
              </Button>
            )}
          </Box>

          <Box sx={{ margin: "30px 0 0 0" }}>
            {Array.isArray(assuntos) && assuntos.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "400px",
                }}
              >
                {paginatedAssuntos.map((assunto, key) => (
                  <AssuntoComponent
                    key={key}
                    assunto={assunto}
                    concursos={concursos}
                    setConcursos={setConcursos}
                    setAssuntos={setAssuntos}
                    disciplinaId={id}
                  />
                ))}
                <Box sx={styles.containerPagination}>
                  <Pagination
                    count={Math.ceil(filteredRows?.length / itemsPerPage)}
                    color="primary"
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Box>
              </Box>
            ) : (
              <>
                <Box sx={styles.containerWithoutConcurso}>
                  <Typography variant="title">
                    Nenhum assunto encontrado para essa disciplina.
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
      <AddAssunto
        open={open}
        setOpen={setOpen}
        concursos={concursos}
        setConcursos={setConcursos}
        setSnackbar={setSnackbar}
        disciplinaId={id}
        setAssuntos={setAssuntos}
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
    </>
  );
}
