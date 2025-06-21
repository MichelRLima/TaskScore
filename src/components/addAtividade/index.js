import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import "dayjs/locale/pt-br"; // importa o idioma brasileiro
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { encontrarConcursoPorDisciplina } from "../../utils/functions";

export default function AddAtividade(params) {
  const {
    open,
    assunto,
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
  const [newAtividade, setNewAtividade] = useState({
    nomeAtividade: "",
    totalQuestoes: 0,
    totalAcertos: 0,
    date: dayjs(),
  });

  const handleCancelar = () => {
    setOpen(false);
    setValidation(false);
    setNewAtividade({
      nomeAtividade: "",
      totalQuestoes: 0,
      totalAcertos: 0,
      date: dayjs(),
    });
  };
  const handleSalvar = () => {
    if (
      !newAtividade?.nomeAtividade?.trim() ||
      (parseInt(newAtividade?.totalQuestoes) !== 0 &&
        !newAtividade?.totalQuestoes) ||
      (parseInt(newAtividade?.totalAcertos) !== 0 &&
        !newAtividade?.totalAcertos) > 0
    ) {
      setValidation(true);
    } else if (
      parseInt(newAtividade?.totalQuestoes) <
      parseInt(newAtividade?.totalAcertos)
    ) {
      setSnackbar({
        children:
          "O total de acertos não pode ser maior que o total de questões.",
        severity: "error",
      });
    } else if (!dayjs(newAtividade?.date).isValid()) {
      setSnackbar({
        children: "Por favor, selecione uma data válida.",
        severity: "error",
      });
    } else {
      const newId = crypto.randomUUID();

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
      const assuntoIndex = assuntosCopy.findIndex((a) => a.id === assunto?.id);
      if (assuntoIndex === -1) return concursos;

      const atividadesCopy = [...(assuntosCopy[assuntoIndex].atividades ?? [])];

      // Continua normalmente se passou na validação
      atividadesCopy.push({
        ...newAtividade,
        id: newId,
        date: dayjs(newAtividade?.date).toDate(),
      });

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

      setAssuntos((prev) => {
        const assuntoIndex = prev.findIndex((a) => a?.id === assunto?.id);

        if (assuntoIndex !== -1) {
          const updatedAssuntos = [...prev];
          const atividades = updatedAssuntos[assuntoIndex]?.atividades ?? [];

          updatedAssuntos[assuntoIndex] = {
            ...updatedAssuntos[assuntoIndex],
            atividades: [
              ...atividades,
              {
                ...newAtividade,
                id: newId,
                date: dayjs(newAtividade?.date).toDate(),
              },
            ],
          };
          return updatedAssuntos;
        }
        return prev;
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
          <Typography variant="subtitle1">Adicionar atividade</Typography>
        </Box>
        <Box sx={styles.containerInput}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={newAtividade?.nomeAtividade}
            error={!newAtividade?.nomeAtividade?.trim() && validation}
            helperText={
              !newAtividade?.nomeAtividade?.trim() &&
              validation &&
              "Necessário informar o nome da atividade."
            }
            onChange={(e) =>
              setNewAtividade((prev) => ({
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
            value={newAtividade?.totalQuestoes}
            error={
              !newAtividade?.totalQuestoes &&
              parseInt(newAtividade?.totalQuestoes) !== 0 &&
              validation
            }
            helperText={
              !newAtividade?.totalQuestoes &&
              parseInt(newAtividade?.totalQuestoes) !== 0 &&
              validation &&
              "Necessário informar o total de questões."
            }
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setNewAtividade((prev) => ({
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
            value={newAtividade?.totalAcertos}
            error={
              !newAtividade?.totalAcertos &&
              parseInt(newAtividade?.totalAcertos) !== 0 &&
              !newAtividade?.totalAcertos &&
              validation
            }
            helperText={
              !newAtividade?.totalAcertos &&
              parseInt(newAtividade?.totalAcertos) !== 0 &&
              validation &&
              "Necessário informar o total de acertos."
            }
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setNewAtividade((prev) => ({
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              value={newAtividade?.date}
              onChange={(newData) =>
                setNewAtividade((prev) => ({ ...prev, date: newData }))
              }
              defaultValue={dayjs()}
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
