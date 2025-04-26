import { Button, Modal, TextField, Typography, useTheme } from "@mui/material";
import useStyles from "./styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
export default function EditConcurso(params) {
  const {
    openEdit,
    setOpenEdit,
    editConcurso,
    setConcursos,
    setAnchorEl,
    setSnackbar,
    handleCloseMenuConcurso,
  } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validationEdit, setValidationEdit] = useState(false);
  const [concursoName, setConcursoName] = useState("");

  useEffect(() => {
    setConcursoName(editConcurso?.concurso);
  }, [openEdit]);

  const handleSalvarEdit = () => {
    if (!concursoName?.trim()) {
      setValidationEdit(true);
    } else {
      setConcursos((prev) => {
        const updatedConcursos = prev.map((concurso) =>
          concurso.id === editConcurso?.id
            ? { ...concurso, concurso: concursoName }
            : concurso
        );

        // Save updated concursos to local storage
        localStorage.setItem("concursos", JSON.stringify(updatedConcursos));

        return updatedConcursos;
      });
      handleCloseMenuConcurso();
      setAnchorEl(false);
      handleCancelarEdit();
      setSnackbar({
        children: "Concurso editado!",
        severity: "success",
      });
    }
  };

  const handleCancelarEdit = () => {
    setOpenEdit(false);
    setValidationEdit(false);
    setConcursoName(editConcurso?.concurso);
  };
  return (
    <Modal open={openEdit} onClose={handleCancelarEdit}>
      <Box sx={styles.modal}>
        <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
          <Typography variant="subtitle1">Editar concurso</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={concursoName}
            error={!concursoName?.trim() && validationEdit}
            helperText={
              !concursoName?.trim() &&
              validationEdit &&
              "Necessário informar o nome do concurso."
            }
            onChange={(e) => setConcursoName(e.target.value)}
            label={"Nome do concurso"}
          />
        </Box>
        <Box sx={styles.containerButtons}>
          <Button
            onClick={handleSalvarEdit}
            sx={{ margin: "0 10px 0 0" }}
            variant="contained"
          >
            Salvar
          </Button>
          <Button onClick={handleCancelarEdit}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
}
