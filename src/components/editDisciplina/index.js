import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { useEffect, useState } from "react";
export default function EditDisciplina(params) {
  const {
    open,
    setConcursos,
    setOpen,
    thisConcurso,
    thisDisciplina,
    setOpenMenu,
    setSnackbar,
  } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validation, setValidation] = useState(false);
  const [editDisciplina, setEditDisciplina] = useState("");

  useEffect(() => {
    setEditDisciplina(thisDisciplina?.disciplina);
  }, [open]);

  const handleSalvar = () => {
    if (!editDisciplina?.trim()) {
      setValidation(true);
    } else {
      const disciplinasEdit = thisConcurso?.disciplinas?.map((disciplina) => {
        if (disciplina?.id === thisDisciplina?.id) {
          return { ...disciplina, disciplina: editDisciplina?.trim() };
        }
        return disciplina;
      });

      setConcursos((prev) => {
        const updatedConcursos = prev.map((concurso) =>
          concurso.id === thisConcurso?.id
            ? { ...concurso, disciplinas: disciplinasEdit }
            : concurso
        );

        // Save updated concursos to local storage
        localStorage.setItem("concursos", JSON.stringify(updatedConcursos));

        return updatedConcursos;
      });
      handleCancelar();
      setOpenMenu(false);
      setSnackbar({
        children: "Disciplina editada!",
        severity: "success",
      });
    }
  };

  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setEditDisciplina("");
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
          <Typography variant="subtitle1">Editar disciplina</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={editDisciplina}
            error={!editDisciplina?.trim() && validation}
            helperText={
              !editDisciplina?.trim() &&
              validation &&
              "Necessário informar o nome da disciplina."
            }
            onChange={(e) => setEditDisciplina(e.target.value)}
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
