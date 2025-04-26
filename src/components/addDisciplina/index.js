import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { useState } from "react";
export default function AddDisciplina(params) {
  const { open, setConcursos, concursos, setOpen, concursoId, setSnackbar } =
    params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validation, setValidation] = useState(false);
  const [newDisciplina, setNewDisciplina] = useState("");
  const handleSalvar = () => {
    if (!newDisciplina?.trim()) {
      setValidation(true);
    } else {
      const concursosCopy = [...concursos];

      const concursoIndex = concursosCopy.findIndex((c) => c.id === concursoId);
      if (concursoIndex === -1) return concursos; // Se não achar, retorna original

      const disciplinasCopy = [
        ...(concursosCopy[concursoIndex].disciplinas ?? []),
      ];

      disciplinasCopy.push({
        disciplina: newDisciplina?.trim(),
        id: crypto.randomUUID(),
      });

      // Atualiza o concurso
      concursosCopy[concursoIndex] = {
        ...concursosCopy[concursoIndex],
        disciplinas: disciplinasCopy,
      };

      const updatedConcursos = concursosCopy;

      setConcursos(updatedConcursos);
      localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
      handleCancelar();
      setNewDisciplina("");
      setSnackbar({
        children: "Disciplina adicionada!",
        severity: "success",
      });
    }
  };
  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setNewDisciplina("");
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
          <Typography variant="subtitle1">Adicionar disciplina</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={newDisciplina}
            error={!newDisciplina?.trim() && validation}
            helperText={
              !newDisciplina?.trim() &&
              validation &&
              "Necessário informar o nome da disciplina."
            }
            onChange={(e) => setNewDisciplina(e.target.value)}
            label={"Nome da disciplina"}
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
