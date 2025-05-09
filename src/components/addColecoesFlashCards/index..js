import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
  const [color, setColor] = useState("");
  const [flashcards, setFlashcards] = useState([
    {
      id: crypto.randomUUID(),
      front: "",
      back: "",
      colorFront: "chip.waitingReview",
      colorBack: "chip.completed",
    },
  ]);
  const scrollContainerRef = useRef(null);
  const scrollEndRef = useRef(null);
  const wasAddingRef = useRef(false); // Ref para detectar adição
  const allColor = [
    "chip.pending",
    "chip.inProgress",
    "chip.completed",
    "chip.waitingReview",
    "chip.waitingReturn",
    "chip.arquive",
    "chip.attention",
  ];
  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      {
        id: crypto.randomUUID(),
        front: "",
        back: "",
        colorFront: "chip.waitingReview",
        colorBack: "chip.completed",
      },
    ]);
    wasAddingRef.current = true;
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
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
    setNomeColecao("");
    setFlashcards([
      {
        id: crypto.randomUUID(),
        front: "",
        back: "",
        colorFront: "chip.waitingReview",
        colorBack: "chip.completed",
      },
    ]);
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
    const colecao = { id: crypto.randomUUID(), nomeColecao, flashcards };

    setColecoes((prev) => [...prev, colecao]);
    localStorage.setItem("flashCards", JSON.stringify([...colecoes, colecao]));
    handleCancelar();
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
              {flashcards?.map((card, index) => (
                <Box key={card.id}>
                  <Box sx={styles.containerFlashCard}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          size="small"
                          sx={{ width: "100%", margin: "5px 0" }}
                          label={"Frente"}
                          value={card.front}
                          onChange={(e) =>
                            handleChange(card.id, "front", e.target.value)
                          }
                        />
                        <FormControl size="small" sx={{ m: 1, minWidth: 65 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Cor
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={card?.colorFront}
                            onChange={(e) =>
                              handleChange(
                                card.id,
                                "colorFront",
                                e.target.value
                              )
                            }
                            autoWidth
                            label="Cor"
                          >
                            {allColor?.map((color) => (
                              <MenuItem value={color}>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: color,
                                  }}
                                ></Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          size="small"
                          sx={{ width: "100%", margin: "5px 0" }}
                          label={"Verso"}
                          value={card.back}
                          onChange={(e) =>
                            handleChange(card.id, "back", e.target.value)
                          }
                        />
                        <FormControl size="small" sx={{ m: 1, minWidth: 65 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Cor
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={card?.colorBack}
                            onChange={(e) =>
                              handleChange(card.id, "colorBack", e.target.value)
                            }
                            autoWidth
                            label="Cor"
                          >
                            {allColor?.map((color) => (
                              <MenuItem value={color}>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: color,
                                  }}
                                ></Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
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
              <Button onClick={handleCancelar} variant="text">
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
