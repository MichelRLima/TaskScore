import {
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
export default function AddColecoesFlashCards(params) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { open, setColecoes, colecoes, setOpen, setSnackbar } = params;
  const [nomeColecao, setNomeColecao] = useState("");
  const [flashcards, setFlashcards] = useState([
    { id: crypto.randomUUID(), front: "", back: "" },
  ]);
  const scrollContainerRef = useRef(null);
  const scrollEndRef = useRef(null);
  const wasAddingRef = useRef(false); // Ref para detectar adição
  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { id: crypto.randomUUID(), front: "", back: "" },
    ]);
    wasAddingRef.current = true;
  };

  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleChange = (id, field, value) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };
  const handleCancelar = () => {
    setOpen(false);
  };
  const handleSalvar = () => {
    if (nomeColecao === "") {
      setSnackbar({
        open: true,
        message: "Nome da coleção não pode ser vazio",
        severity: "error",
      });
      return;
    }
    if (flashcards.length === 0) {
      setSnackbar({
        open: true,
        message: "FlashCards não podem ser vazios",
        severity: "error",
      });
      return;
    }
    const colecao = { nomeColecao, flashcards };
    setColecoes((prev) => [...prev, colecao]);
    localStorage.setItem("flashCards", JSON.stringify([...colecoes, colecao]));
    setOpen(false);
  };

  useEffect(() => {
    if (wasAddingRef.current) {
      scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
      wasAddingRef.current = false; // Reseta flag
    }
  }, [flashcards]);
  return (
    <Modal
      open={open}
      onClose={handleCancelar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal}>
        <Typography variant="subtitle1">Coleção de FlashCards</Typography>
        <Box sx={{ width: "100%", margin: "20px 0" }}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            label={"Nome da coleção"}
            value={nomeColecao}
            onChange={(e) => setNomeColecao(e.target.value)}
          />

          <Box sx={{ width: "100%", margin: "20px 0" }}>
            <Typography variant="subtitle1">FlashCard</Typography>

            <Box ref={scrollContainerRef} sx={styles.boxFlashCard}>
              {flashcards.map((card, index) => (
                <Box key={card.id}>
                  <Box sx={styles.containerFlashCard}>
                    <Box sx={{ flexGrow: 1 }}>
                      <TextField
                        size="small"
                        sx={{ width: "100%", margin: "5px 0" }}
                        label={"Frente"}
                        value={card.front}
                        onChange={(e) =>
                          handleChange(card.id, "front", e.target.value)
                        }
                      />
                      <TextField
                        size="small"
                        sx={{ width: "100%", margin: "5px 0" }}
                        label={"Verso"}
                        value={card.back}
                        onChange={(e) =>
                          handleChange(card.id, "back", e.target.value)
                        }
                      />
                    </Box>

                    <Box>
                      {index === flashcards.length - 1 ? (
                        <IconButton onClick={addFlashcard}>
                          <Add />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => removeFlashcard(card.id)}>
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  <Divider sx={{ margin: "20px 0" }} />
                </Box>
              ))}
              <Box ref={scrollEndRef} />
            </Box>
            <Box sx={styles.containerAcoes}>
              <Button variant="contained" onClick={handleSalvar}>
                Salvar
              </Button>
              <Button variant="text">Cancelar</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
