import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { useState } from "react";
export default function AddConcurso(params) {
  const { open, setConcursos, concursos, setOpen, setSnackbar } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validation, setValidation] = useState(false);
  const [newConcurso, setNewConcurso] = useState("");
  const handleSalvar = () => {
    if (!newConcurso?.trim()) {
      setValidation(true);
    } else {
      setConcursos((prev) => [
        ...prev,
        { concurso: newConcurso?.trim(), id: crypto.randomUUID() },
      ]);
      localStorage.setItem(
        "concursos",
        JSON.stringify([
          ...concursos,
          { concurso: newConcurso?.trim(), id: crypto.randomUUID() },
        ])
      );
      handleCancelar();
      setNewConcurso("");
      setSnackbar({
        children: "Concurso adicionado!",
        severity: "success",
      });
    }
  };
  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setNewConcurso("");
  };

  return (
    <Modal
      open={open}
      onClose={handleCancelar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal}>
        <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
          <Typography variant="subtitle1">Adicionar concurso</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={newConcurso}
            error={!newConcurso?.trim() && validation}
            helperText={
              !newConcurso?.trim() &&
              validation &&
              "Necessário informar o nome do concurso."
            }
            onChange={(e) => setNewConcurso(e.target.value)}
            label={"Nome do concurso"}
          />
        </Box>
        <Box sx={styles.containerButtons}>
          <Button
            onClick={handleSalvar}
            sx={{ margin: "0 10px 0 0" }}
            variant="contained"
          >
            Salvar
          </Button>
          <Button onClick={handleCancelar}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
}
