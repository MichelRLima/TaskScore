import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import "dayjs/locale/pt-br";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { encontrarConcursoPorDisciplina } from "../../utils/functions";

export default function EditAtividade(params) {
  const {
    open,
    setOpen,
    setSnackbar,
    concursos,
    setConcursos,
    setAssuntos,
    disciplinaId,
    assunto,
    atividade,
    setAnchorEl,
  } = params;

  const theme = useTheme();
  const styles = useStyles(theme);
  const [validation, setValidation] = useState(false);
  const [editAtividade, setEditAtividade] = useState({
    nomeAtividade: "",
    totalQuestoes: 0,
    totalAcertos: 0,
    date: dayjs(),
    id: "",
  });

  useEffect(() => {
    if (atividade) {
      setEditAtividade({
        nomeAtividade: atividade.nomeAtividade || "",
        totalQuestoes: atividade.totalQuestoes || 0,
        totalAcertos: atividade.totalAcertos || 0,
        date: dayjs(atividade.date) || dayjs(),
        id: atividade.id || "",
      });
    }
  }, [open]);

  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setAnchorEl(null);
  };

  const handleSalvar = () => {
    if (
      !editAtividade?.nomeAtividade?.trim() ||
      (parseInt(editAtividade?.totalQuestoes) !== 0 &&
        !editAtividade?.totalQuestoes) ||
      (parseInt(editAtividade?.totalAcertos) !== 0 &&
        !editAtividade?.totalAcertos)
    ) {
      setValidation(true);
    } else if (
      parseInt(editAtividade?.totalQuestoes) <
      parseInt(editAtividade?.totalAcertos)
    ) {
      setSnackbar({
        children:
          "O total de acertos não pode ser maior que o total de questões.",
        severity: "error",
      });
    } else if (!dayjs(editAtividade?.date).isValid()) {
      setSnackbar({
        children: "Por favor, selecione uma data válida.",
        severity: "error",
      });
    } else {
      const concursoId = encontrarConcursoPorDisciplina(
        concursos,
        disciplinaId
      );
      const concursosCopy = [...concursos];
      const concursoIndex = concursosCopy.findIndex((c) => c.id === concursoId);
      if (concursoIndex === -1) return;

      const disciplinasCopy = [
        ...(concursosCopy[concursoIndex].disciplinas ?? []),
      ];
      const disciplinaIndex = disciplinasCopy.findIndex(
        (d) => d.id === disciplinaId
      );
      if (disciplinaIndex === -1) return;

      const assuntosCopy = [
        ...(disciplinasCopy[disciplinaIndex].assuntos ?? []),
      ];
      const assuntoIndex = assuntosCopy.findIndex((a) => a.id === assunto?.id);
      if (assuntoIndex === -1) return;

      const atividadesCopy = [...(assuntosCopy[assuntoIndex].atividades ?? [])];
      const atividadeIndex = atividadesCopy.findIndex(
        (a) => a.id === editAtividade.id
      );
      if (atividadeIndex === -1) return;

      // ⚡ Atualiza a atividade editada
      atividadesCopy[atividadeIndex] = {
        ...editAtividade,
        date: dayjs(editAtividade.date).toDate(),
      };

      assuntosCopy[assuntoIndex] = {
        ...assuntosCopy[assuntoIndex],
        atividades: atividadesCopy,
      };

      disciplinasCopy[disciplinaIndex] = {
        ...disciplinasCopy[disciplinaIndex],
        assuntos: assuntosCopy,
      };

      concursosCopy[concursoIndex] = {
        ...concursosCopy[concursoIndex],
        disciplinas: disciplinasCopy,
      };

      const updatedConcursos = concursosCopy;
      localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
      setConcursos(updatedConcursos);

      // Atualiza também o setAssuntos, se precisar
      setAssuntos((prev) => {
        const updatedAssuntos = [...prev];
        const assuntoIndex = updatedAssuntos.findIndex(
          (a) => a.id === assunto?.id
        );

        if (assuntoIndex !== -1) {
          const atividades = [
            ...(updatedAssuntos[assuntoIndex]?.atividades ?? []),
          ];
          const atividadeIndex = atividades.findIndex(
            (a) => a.id === editAtividade.id
          );
          if (atividadeIndex !== -1) {
            atividades[atividadeIndex] = {
              ...editAtividade,
              date: dayjs(editAtividade.date).toDate(),
            };
          }

          updatedAssuntos[assuntoIndex] = {
            ...updatedAssuntos[assuntoIndex],
            atividades,
          };
        }
        return updatedAssuntos;
      });

      setSnackbar({
        children: "Atividade editada com sucesso!",
        severity: "success",
      });

      handleCancelar();
    }
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
          <Typography variant="subtitle1">Editar atividade</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={editAtividade?.nomeAtividade}
            error={!editAtividade?.nomeAtividade?.trim() && validation}
            helperText={
              !editAtividade?.nomeAtividade?.trim() &&
              validation &&
              "Necessário informar o nome da atividade."
            }
            onChange={(e) =>
              setEditAtividade((prev) => ({
                ...prev,
                nomeAtividade: e.target.value,
              }))
            }
            label={"Nome da atividade"}
          />
        </Box>
        <Divider sx={{ margin: "15px 0" }} />
        <Box sx={{ ...styles.containerInput, gap: 2 }}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={editAtividade?.totalQuestoes}
            error={
              !editAtividade?.totalQuestoes &&
              parseInt(editAtividade?.totalQuestoes) !== 0 &&
              validation
            }
            helperText={
              !editAtividade?.totalQuestoes &&
              parseInt(editAtividade?.totalQuestoes) !== 0 &&
              validation &&
              "Necessário informar o total de questões."
            }
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setEditAtividade((prev) => ({
                  ...prev,
                  totalQuestoes: value,
                }));
              }
            }}
            label={"Total de questões"}
          />
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={editAtividade?.totalAcertos}
            error={
              !editAtividade?.totalAcertos &&
              parseInt(editAtividade?.totalAcertos) !== 0 &&
              validation
            }
            helperText={
              !editAtividade?.totalAcertos &&
              parseInt(editAtividade?.totalAcertos) !== 0 &&
              validation &&
              "Necessário informar o total de acertos."
            }
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setEditAtividade((prev) => ({
                  ...prev,
                  totalAcertos: value,
                }));
              }
            }}
            label={"Total de acertos"}
          />
        </Box>
        <Divider sx={{ margin: "15px 0" }} />
        <Box sx={{ ...styles.containerInput, gap: 2 }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DatePicker
              format="DD/MM/YYYY"
              value={editAtividade?.date}
              onChange={(newData) =>
                setEditAtividade((prev) => ({ ...prev, date: newData }))
              }
              label="Data da atividade"
              textField={(params) => (
                <TextField
                  {...params}
                  inputProps={{ ...params.inputProps, readOnly: false }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Divider sx={{ margin: "15px 0" }} />
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
