import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import {
  Add,
  AddOutlined,
  BookmarkBorderOutlined,
  Clear,
  ImportContactsOutlined,
  Search,
} from "@mui/icons-material";
import useStyles from "./styles";
import AddConcurso from "../../components/addConcurso";

import ConcursoComponent from "../../components/concursoComponent";
import CardComponent from "../../components/cardComponent";
export default function Concursos() {
  const [buscarConcurso, setBuscarConcurso] = useState("");
  const [concursos, setConcursos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = 5;
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const theme = useTheme();
  const styles = useStyles(theme);
  const handleOpen = () => setOpen(true);

  const filteredRows = concursos?.filter((row, index) => {
    row.numero = index;
    return row.concurso?.toLowerCase()?.includes(buscarConcurso?.toLowerCase());
  });

  useEffect(() => {
    try {
      const storedConcursos = localStorage.getItem("concursos");

      if (storedConcursos && storedConcursos !== "undefined") {
        setConcursos(JSON.parse(storedConcursos));
      } else {
        setConcursos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar concursos do localStorage:", error);
      setConcursos([]);
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedConcursos = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function allDisciplinas(concursos) {
    return concursos.reduce((total, concurso) => {
      return total + (concurso.disciplinas?.length || 0);
    }, 0);
  }

  return (
    <Box sx={styles?.containerLayout}>
      <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
        <Grid
          flexGrow={1}
          container
          spacing={2}
          columns={{ xs: 2, sm: 12, md: 12 }}
        >
          <Grid size={{ xs: 2, sm: 6, md: 3 }}>
            <CardComponent
              icon={BookmarkBorderOutlined}
              typeCard={3}
              descriptionCard={"Concursos"}
              valueCard={concursos?.length || 0}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 6, md: 3 }}>
            <CardComponent
              icon={ImportContactsOutlined}
              valueCard={allDisciplinas(concursos)}
              descriptionCard={"Disciplinas"}
              typeCard={4}
            />
          </Grid>
        </Grid>
      </Box>
      <Paper variant={"outlined"} sx={styles.containerPaper}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            size="small"
            variant="outlined"
            sx={styles.textFieldBuscar}
            label={"Buscar concurso"}
            placeholder="Concurso"
            value={buscarConcurso}
            onChange={(e) => setBuscarConcurso(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: buscarConcurso ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setBuscarConcurso("")} edge="end">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          {windowWidth > 725 && (
            <Button
              size="small"
              sx={{ width: "180px" }}
              startIcon={<AddOutlined />}
              variant="contained"
              onClick={handleOpen}
            >
              Adicionar concurso
            </Button>
          )}
          {windowWidth <= 725 && (
            <Button size="small" variant="contained" onClick={handleOpen}>
              <AddOutlined />
            </Button>
          )}
        </Box>
        <Box sx={{ margin: "30px 0 0 0" }}>
          {Array.isArray(concursos) && concursos?.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "400px",
              }}
            >
              {paginatedConcursos?.map((concurso, key) => (
                <ConcursoComponent
                  key={key}
                  concurso={concurso}
                  setConcursos={setConcursos}
                  allConcursos={concursos}
                />
              ))}
              <Box sx={styles.containerPagination}>
                <Pagination
                  count={Math.ceil(filteredRows.length / itemsPerPage)}
                  color="primary"
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={styles.containerWithoutConcurso}>
              <Typography variant="title">
                Nenhum concurso cadastrado
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
      <AddConcurso
        open={open}
        concursos={concursos}
        setConcursos={setConcursos}
        setOpen={setOpen}
        setSnackbar={setSnackbar}
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
