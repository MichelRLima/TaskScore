import { Box } from "@mui/system";
import FlashCardComponent from "../flashCardComponent";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { AddOutlined, Clear, Search } from "@mui/icons-material";
import AddColecoesFlashCards from "../addColecoesFlashCards/index.";
export default function FlashCards() {
  const [buscarColecao, setBuscarColecao] = useState("");
  const [colecoes, setColecoes] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const styles = useStyles(theme);

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
  return (
    <Box sx={styles.container}>
      <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
        <Typography variant="title">Coleções de flashcards</Typography>
      </Box>
      <Paper
        variant={theme.palette.mode === "dark" ? "outlined" : "elevation"}
        elevation={3}
        sx={styles.containerPaper}
      >
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
          <Button
            onClick={() => setOpen(true)}
            startIcon={<AddOutlined />}
            variant="contained"
          >
            Adicionar coleção
          </Button>
        </Box>
        <Box>
          <AddColecoesFlashCards
            open={open}
            setOpen={setOpen}
            colecoes={colecoes}
            setColecoes={setColecoes}
          />
        </Box>
        {Array.isArray(colecoes) && colecoes.length > 0 ? (
          colecoes.map((colecao, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<AddOutlined />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{colecao.nomeColecao}</Typography>
              </AccordionSummary>
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
    </Box>
  );
}
