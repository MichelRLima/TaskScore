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
import { Box, Grid, Stack, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import {
  AddOutlined,
  BookmarkBorderOutlined,
  CheckOutlined,
  Clear,
  ClearOutlined,
  ImportContactsOutlined,
  LibraryBooksOutlined,
  Search,
  StickyNote2Outlined,
  TopicOutlined,
} from "@mui/icons-material";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import AddAssunto from "../../components/addAssunto";
import AssuntoComponent from "../../components/assuntoComponent";
import {
  encontrarConcursoPorDisciplina,
  extrairDisciplinas,
} from "../../utils/functions";
import CardComponent from "../../components/cardComponent";

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
  const [analiseAtividades, setAnaliseAtividades] = useState({
    acertos: 0,
    erros: 0,
    atividades: 0,
  });
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
    analiseErrosEAcertos(assuntos);
    analiseTotalAtividades(assuntos);
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

  const Concurso = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BookmarkBorderOutlined sx={{ color: "#2196f3", fontSize: "15px" }} />
        <Typography sx={{ fontSize: "10px" }}>Concurso:</Typography>

        <Typography
          variant="mySubtitle"
          sx={{ fontSize: "10px", fontWeight: "bold", marginLeft: "5px" }}
        >
          {concursoName || "Nenhum concurso encontrado"}
        </Typography>
      </Box>
    );
  };
  function analiseErrosEAcertos(array) {
    let totalAcertos = 0;
    let totalErros = 0;

    array.forEach((obj) => {
      obj.atividades.forEach((atividade) => {
        const acertos = parseInt(atividade.totalAcertos);
        const questoes = parseInt(atividade.totalQuestoes);
        totalAcertos += acertos;
        totalErros += questoes - acertos;
      });
    });
    setAnaliseAtividades({
      acertos: totalAcertos,
      erros: totalErros,
    });
    return {
      totalAcertos,
      totalErros,
    };
  }

  function analiseTotalAtividades(array) {
    let total = 0;

    array.forEach((obj) => {
      if (Array.isArray(obj.atividades)) {
        total += obj.atividades.length;
      }
    });
    setAnaliseAtividades((prev) => ({
      ...prev,
      atividades: total,
    }));
  }

  return (
    <>
      <Box sx={styles.containerLayout}>
        <Stack spacing={2} sx={{ margin: "0 0 20px 0" }}>
          <Breadcrumbs
            sx={{ fontSize: "0.8rem" }}
            separator="›"
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
          <Grid
            flexGrow={1}
            container
            spacing={1}
            columns={{ xs: 2, sm: 12, md: 12 }}
          >
            {" "}
            <Grid size={{ xs: 2, sm: 12, md: 12 }}>
              <CardComponent
                descriptionCard={<Concurso />}
                valueCard={disciplina?.disciplina}
                typeCard={4}
                icon={ImportContactsOutlined}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 6, md: 3 }}>
              <CardComponent
                icon={TopicOutlined}
                typeCard={5}
                descriptionCard={"Assuntos"}
                valueCard={assuntos?.length || 0}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 6, md: 3 }}>
              <CardComponent
                icon={StickyNote2Outlined}
                valueCard={analiseAtividades?.atividades || 0}
                descriptionCard={"Atividades"}
                typeCard={10}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 6, md: 3 }}>
              <CardComponent
                icon={CheckOutlined}
                valueCard={analiseAtividades?.acertos || 0}
                descriptionCard={"Acertos"}
                typeCard={2}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 6, md: 3 }}>
              <CardComponent
                icon={ClearOutlined}
                valueCard={analiseAtividades.erros || 0}
                descriptionCard={"Erros"}
                typeCard={1}
              />
            </Grid>
          </Grid>
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
