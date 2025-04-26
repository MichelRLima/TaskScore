import { Button, Modal, TextField, Typography, useTheme } from "@mui/material";
import useStyles from "./styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  encontrarConcursoPorDisciplina,
  extrairDisciplinas,
} from "../../utils/functions";

export default function EditAssunto(params) {
  const {
    openEdit,
    setOpenEdit,
    editAssunto,
    setConcursos,
    concursos,
    setAnchorElAssunto,
    setSnackbar,
    setAssuntos,
  } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [validationEdit, setValidationEdit] = useState(false);
  const [assuntoName, setAssuntoName] = useState("");
  const { id } = useParams();
  const disciplinaId = id;
  useEffect(() => {
    setAssuntoName(editAssunto?.assunto);
  }, [editAssunto]);

  const handleSalvarEdit = () => {
    if (!assuntoName?.trim()) {
      setValidationEdit(true);
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

      const assuntosCopy = [
        ...(disciplinasCopy[disciplinaIndex].assuntos ?? []),
      ];

      const assuntoIndex = assuntosCopy.findIndex(
        (a) => a.id === editAssunto?.id
      );

      if (assuntoIndex !== -1) {
        // Editar assunto existente
        assuntosCopy[assuntoIndex] = {
          ...assuntosCopy[assuntoIndex],
          assunto: assuntoName,
        };
      } else {
        // Adicionar novo assunto
        assuntosCopy.push({
          id: crypto.randomUUID(),
          assunto: assuntoName,
          atividades: [],
        });
      }

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
      handleCancelarEdit();
      setSnackbar({
        children: "Assunto editado!",
        severity: "success",
      });
    }
  };

  const handleCancelarEdit = () => {
    setOpenEdit(false);
    setValidationEdit(false);
    setAssuntoName(editAssunto?.assunto);
    setAnchorElAssunto(null);
  };
  return (
    <Modal open={openEdit} onClose={handleCancelarEdit}>
      <Box sx={styles.modal}>
        <Box sx={{ width: "100%", margin: "0 0 20px 0" }}>
          <Typography variant="subtitle1">Editar assunto</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={assuntoName}
            error={!assuntoName?.trim() && validationEdit}
            helperText={
              !assuntoName?.trim() &&
              validationEdit &&
              "Necessário informar o nome do assunto."
            }
            onChange={(e) => setAssuntoName(e.target.value)}
            label={"Nome do assunto"}
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
