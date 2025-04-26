import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { useState } from "react";
import {
  encontrarConcursoPorDisciplina,
  extrairDisciplinas,
} from "../../utils/functions";

export default function AddAssunto(params) {
  const {
    open,
    setConcursos,
    concursos,
    setOpen,
    setSnackbar,
    disciplinaId,
    setAssuntos,
  } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validation, setValidation] = useState(false);
  const [newAssunto, setNewAssunto] = useState("");
  const handleSalvar = () => {
    if (!newAssunto?.trim()) {
      setValidation(true);
    } else {
      const concursoId = encontrarConcursoPorDisciplina(
        concursos,
        disciplinaId
      );
      const concursosCopy = [...concursos];

      const concursoIndex = concursosCopy.findIndex((c) => c.id === concursoId);
      if (concursoIndex === -1) return concursos;

      const disciplinasCopy = [
        ...(concursosCopy[concursoIndex].disciplinas ?? []),
      ];

      const disciplinaIndex = disciplinasCopy.findIndex(
        (d) => d.id === disciplinaId
      );
      if (disciplinaIndex === -1) return concursos;

      // Atualizar apenas a disciplina correta
      const assuntosCopy = [
        ...(disciplinasCopy[disciplinaIndex].assuntos ?? []),
      ];

      assuntosCopy.push({
        id: crypto.randomUUID(),
        assunto: newAssunto,
        atividades: [],
      });

      // Atualiza disciplina
      disciplinasCopy[disciplinaIndex] = {
        ...disciplinasCopy[disciplinaIndex],
        assuntos: assuntosCopy,
      };

      // Atualiza concurso
      concursosCopy[concursoIndex] = {
        ...concursosCopy[concursoIndex],
        disciplinas: disciplinasCopy,
      };

      const updatedConcursos = concursosCopy;

      setConcursos(updatedConcursos);
      localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
      const allDisciplinas = extrairDisciplinas(updatedConcursos);
      const disciplina = allDisciplinas?.find(
        (item) => item?.id === disciplinaId
      ); // ou o id que você quiser
      setAssuntos(disciplina?.assuntos || []);
      handleCancelar();
      setSnackbar({
        children: "Assunto adicionado!",
        severity: "success",
      });
    }
  };
  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setNewAssunto("");
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
          <Typography variant="subtitle1">Adicionar assunto</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={newAssunto}
            error={!newAssunto?.trim() && validation}
            helperText={
              !newAssunto?.trim() &&
              validation &&
              "Necessário informar o nome do assunto."
            }
            onChange={(e) => setNewAssunto(e.target.value)}
            label={"Nome do assunto"}
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
