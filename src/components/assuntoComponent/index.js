import {
  AddOutlined,
  Clear,
  DeleteOutlineOutlined,
  Edit,
  ExpandMore,
  MoreVertOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, color, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  XAxis,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

import ModalDelete from "../modalDelete";
import EditAssunto from "../editAssunto";
import {
  encontrarConcursoPorDisciplina,
  extrairDisciplinas,
} from "../../utils/functions";
import AddAtividade from "../addAtividade";
import dayjs from "dayjs";
import EditAtividade from "../editAtividade";
import CardAtividade from "../cardsComponent/cardAtividade";
export default function AssuntoComponent(params) {
  const { assunto, setConcursos, concursos, setAssuntos, disciplinaId } =
    params;
  const [openAddAtividade, setOpenAddAtividade] = useState(false);
  const deleteBody = "Você tem certeza que deseja apagar esse assunto?";
  const deleteBodyAtividade =
    "Você tem certeza que deseja apagar essa ativdade?";
  const confirmDelete = "Deletar assunto";
  const confirmDeleteAtividade = "Deletar atividade";
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [editAssunto, setEditAssunto] = useState({});
  const theme = useTheme();
  const styles = useStyles(theme);
  const [buscarAtividade, setBuscarAtividade] = useState("");
  const [rows, setRows] = useState(assunto?.atividades || []);
  const [thisRow, setThisRow] = useState({});
  const [dataGraficos, setDatagrafico] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAssunto, setAnchorElAssunto] = useState(null);
  const [openDeleteModalAssunto, setOpenDeleteModalAssunto] = useState(false);
  const [openDeleteModalAtividade, setOpenDeleteModalAtividade] =
    useState(false);
  const [openEditAssunto, setOpenEditAssunto] = useState(false);
  const openMenu = Boolean(anchorEl);
  const openMenuAssunto = Boolean(anchorElAssunto);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setDatagrafico(formatarDados(rows));
  }, [rows]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const filteredRows = rows
    ?.map((row, index) => {
      row.numero = index;
      return row;
    })
    ?.filter((row) =>
      row?.nomeAtividade
        ?.toLowerCase()
        ?.includes(buscarAtividade?.toLowerCase())
    );

  const totalPages = Math.ceil((filteredRows?.length || 0) / itemsPerPage);
  const paginatedRows =
    filteredRows?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];
  useEffect(() => {
    const newTotalPages = Math.ceil((filteredRows?.length || 0) / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [filteredRows, itemsPerPage, currentPage]);
  const formatarDados = (atividades) => {
    return atividades
      .map((item) => ({
        Data: dayjs(item.date).format("DD/MM/YYYY"),
        DataOriginal: item.date, // guardando a original pra usar no Tooltip se quiser depois
        Total: Number(item.totalQuestoes),
        Acertos: Number(item.totalAcertos),
        Erros: Number(item.totalQuestoes) - Number(item.totalAcertos),
        Nome: item.nomeAtividade,
      }))
      .sort((a, b) => new Date(a.DataOriginal) - new Date(b.DataOriginal)) // ordenar da mais antiga para a mais recente
      .slice(0, 30);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Pegando o total de questões (é a soma de Acertos + Erros)
      const acertos = payload.find((p) => p.name === "Acertos")?.value || 0;
      const erros = payload.find((p) => p.name === "Erros")?.value || 0;
      const totalQuestoes = acertos + erros;
      const atividade = payload?.[0]?.payload?.Nome || "";

      return (
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            padding: 2,
            borderRadius: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body2">
            <strong>Data:</strong> {label}
          </Typography>
          <Typography variant="body2" sx={styles.textAtividade}>
            <strong>Atividade:</strong> {atividade}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
          <Typography variant="body2">
            <strong>Total:</strong> {totalQuestoes}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  useEffect(() => {
    setRows(assunto?.atividades || []);
  }, [assunto]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenuConcurso = () => {
    setAnchorElAssunto(null);
  };

  const handleClickMenuAssunto = (event) => {
    setAnchorElAssunto(event.currentTarget);
  };
  const handleClickAssunto = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteAtividade = (id) => {
    setLoadingDelete(true);

    const concursoId = encontrarConcursoPorDisciplina(concursos, disciplinaId);

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

    const assuntosCopy = [...(disciplinasCopy[disciplinaIndex].assuntos ?? [])];

    const assuntoIndex = assuntosCopy.findIndex((a) => a.id === assunto?.id);
    if (assuntoIndex === -1) return concursos;

    // Atualiza só o assunto específico
    let atividadesCopy = [...(assuntosCopy[assuntoIndex].atividades ?? [])];

    // Filtra a atividade que queremos remover
    atividadesCopy = atividadesCopy?.filter(
      (atividade) => atividade?.id !== id
    );

    // Atualiza o assunto
    assuntosCopy[assuntoIndex] = {
      ...assuntosCopy[assuntoIndex],
      atividades: atividadesCopy,
    };

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
    localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
    setConcursos(updatedConcursos);

    setAssuntos((prev) => {
      const assuntoIndex = prev.findIndex((a) => a?.id === assunto?.id);

      if (assuntoIndex !== -1) {
        const updatedAssuntos = [...prev];
        const atividades = updatedAssuntos[assuntoIndex]?.atividades ?? [];

        updatedAssuntos[assuntoIndex] = {
          ...updatedAssuntos[assuntoIndex],
          atividades: atividades.filter((atividade) => atividade.id !== id),
        };
        return updatedAssuntos;
      }
      return prev;
    });
    setConcursos(updatedConcursos);
    localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
    const allDisciplinas = extrairDisciplinas(updatedConcursos);
    const disciplina = allDisciplinas?.find(
      (item) => item?.id === disciplinaId
    ); // ou o id que você quiser
    setAssuntos(disciplina?.assuntos || []);
    setLoadingDelete(false);
    handleClose();
    handleCloseMenuConcurso();

    setOpenDeleteModalAssunto(false);
    setOpenDeleteModalAtividade(false);
    setSnackbar({
      children: "Atividade deletada!",
      severity: "success",
    });
  };

  const deleteAssunto = (id) => {
    setLoadingDelete(true);

    const concursoId = encontrarConcursoPorDisciplina(concursos, disciplinaId);
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
    const assuntosCopy = [...(disciplinasCopy[disciplinaIndex].assuntos ?? [])];
    const updatedAssuntos = assuntosCopy.filter((assunto) => assunto.id !== id);
    disciplinasCopy[disciplinaIndex] = {
      ...disciplinasCopy[disciplinaIndex],
      assuntos: updatedAssuntos,
    };
    // Atualiza o concurso com as novas disciplinas
    concursosCopy[concursoIndex] = {
      ...concursosCopy[concursoIndex],
      disciplinas: disciplinasCopy,
    };

    const updatedConcursos = concursosCopy;
    localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
    setConcursos(updatedConcursos);

    // Atualiza o estado dos assuntos
    const allDisciplinas = extrairDisciplinas(updatedConcursos);
    const disciplina = allDisciplinas?.find(
      (item) => item?.id === disciplinaId
    );
    setAssuntos(disciplina?.assuntos || []);

    setLoadingDelete(false);
    handleClose();
    handleCloseMenuConcurso();

    setOpenDeleteModalAssunto(false);
    setSnackbar({
      children: "Assunto deletado!",
      severity: "success",
    });
  };

  // useEffect(() => {
  //   setRows(concurso?.disciplinas);
  // }, [concurso]);

  const columns = [
    {
      field: "nomeAtividade",
      headerName: "Atividade",
      width: 150,
      flex: 1,
    },
    {
      field: "totalQuestoes",
      headerName: "Total de questões",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "totalAcertos",
      headerName: "Acertos",
      minWidth: 100,
      flex: 1,
    },
    {
      field: " ",
      headerName: "Erros",
      minWidth: 100,
      flex: 1,
      valueGetter: (params, row) => {
        return row?.totalQuestoes - row?.totalAcertos;
      },
    },
    {
      field: "analise",
      headerName: "Análise",
      width: 100,
      flex: 1,
      valueGetter: (params, row) => {
        return row?.totalAcertos
          ? parseFloat(
              ((row?.totalAcertos / row?.totalQuestoes) * 100).toFixed(2)
            )
          : 0;
      },
      renderCell: (params) => {
        const analise = params?.row?.totalAcertos
          ? (
              (params?.row?.totalAcertos / params?.row?.totalQuestoes) *
              100
            ).toFixed(2) + "%"
          : "0%";
        const porcentagem = parseFloat(analise.replace("%", ""));
        return (
          <Chip
            label={analise}
            sx={{
              backgroundColor:
                porcentagem >= 90
                  ? "chip.completed"
                  : porcentagem > 75 && porcentagem < 90
                  ? "chip.inProgress"
                  : "chip.pending",
              color: "#ffffff",
            }}
          />
        );
      },
    },
    {
      field: "date",
      headerName: "Data",
      maxWidth: 100,
      flex: 1,

      valueGetter: (params, row) => {
        return row?.date;
      },
      renderCell: (params) => {
        return dayjs(params?.row?.date)?.format("DD/MM/YY");
      },
    },
    {
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={(e) => {
              handleClickAssunto(e);
              setThisRow(params.row);
            }}
          >
            <SettingsOutlined />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Accordion
        variant={color?.mode !== "dark" && "elevation"}
        elevation={3}
        key={assunto?.id}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={styles.conatinerAcoesAccordion}>
            <Typography variant="mySubtitle">{assunto?.assunto}</Typography>
            <IconButton
              component="div"
              onClick={(e) => {
                e.stopPropagation();
                handleClickMenuAssunto(e);
                setEditAssunto(assunto);
              }}
            >
              <MoreVertOutlined />
            </IconButton>
          </Box>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box sx={styles.accordionDetalhes}>
            <TextField
              size="small"
              variant="filled"
              sx={styles.textFieldBuscar}
              label={"Buscar atividade"}
              value={buscarAtividade}
              onChange={(e) => setBuscarAtividade(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: buscarAtividade ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setBuscarAtividade("")}
                      edge="end"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />

            {windowWidth > 725 && (
              <Button
                size="small"
                sx={{ width: "180px" }}
                startIcon={<AddOutlined />}
                variant="outlined"
                onClick={() => {
                  setOpenAddAtividade(true);
                }}
              >
                Adicionar atividade
              </Button>
            )}

            {windowWidth <= 725 && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setOpenAddAtividade(true);
                }}
              >
                <AddOutlined />
              </Button>
            )}
          </Box>
          <Box sx={styles.boxTable}>
            {windowWidth > 725 && (
              <DataGrid
                sx={styles.dataGrid}
                rows={filteredRows}
                columns={columns}
                autoHeight={true}
                disableRowSelectionOnClick
                disableColumnMenu
                pageSizeOptions={[10, 15, 20]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
              />
            )}
            {windowWidth <= 725 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {paginatedRows?.map((atividade, index) => (
                  <div key={atividade.id || index}>
                    <CardAtividade
                      atividade={atividade}
                      handleClickAssunto={handleClickAssunto}
                      setThisRow={setThisRow}
                    />
                    <Divider />
                  </div>
                ))}
                {/* Paginação */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                      gap: 1,
                      marginBottom: 2,
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Anterior
                    </Button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <Button
                        key={idx}
                        size="small"
                        variant={
                          currentPage === idx + 1 ? "contained" : "outlined"
                        }
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Próxima
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Paper
            variant="outlined"
            sx={{ width: "100%", height: "300px", padding: "45px 0" }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 2, marginLeft: 2 }}
            >
              Gráfico de desempenho
            </Typography>

            <ResponsiveContainer width="100%">
              <AreaChart
                data={dataGraficos}
                margin={{
                  top: 10,
                  right: 20,
                  left: -10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorAcertos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorErros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7c7c" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7c7c" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="Data" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Primeiro os erros (embaixo) */}
                <Area
                  type="monotone"
                  dataKey="Erros"
                  stackId="1"
                  stroke="#ff7c7c"
                  fill="url(#colorErros)"
                />

                {/* Depois os acertos (em cima dos erros) */}
                <Area
                  type="monotone"
                  dataKey="Acertos"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="url(#colorAcertos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>

          <AddAtividade
            open={openAddAtividade}
            setOpen={setOpenAddAtividade}
            concursos={concursos}
            setConcursos={setConcursos}
            disciplinaId={disciplinaId}
            assunto={assunto}
            setAssuntos={setAssuntos}
            setSnackbar={setSnackbar}
          />
          <EditAtividade
            open={openEdit}
            setOpen={setOpenEdit}
            concursos={concursos}
            setConcursos={setConcursos}
            disciplinaId={disciplinaId}
            assunto={assunto}
            setAssuntos={setAssuntos}
            setSnackbar={setSnackbar}
            atividade={thisRow}
            setAnchorEl={setAnchorEl}
          />

          <ModalDelete
            openDeleteModal={openDeleteModalAtividade}
            deleteLoad={loadingDelete}
            setOpenDeleteModal={setOpenDeleteModalAtividade}
            execute={() => {
              deleteAtividade(thisRow?.id);
            }}
            severity={"error"}
            contentText={deleteBodyAtividade}
            confirmText={confirmDeleteAtividade}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setOpenEdit(true);
              }}
            >
              {" "}
              <Edit sx={{ marginRight: "10px" }} />
              Editar
            </MenuItem>
            <MenuItem onClick={() => setOpenDeleteModalAtividade(true)}>
              <DeleteOutlineOutlined sx={{ marginRight: "10px" }} />
              Deletar
            </MenuItem>
          </Menu>
        </AccordionDetails>
        <Menu
          id="basic-menu"
          anchorEl={anchorElAssunto}
          open={openMenuAssunto}
          onClose={handleCloseMenuConcurso}
        >
          <MenuItem
            onClick={() => {
              setOpenEditAssunto(true);
            }}
          >
            {" "}
            <Edit sx={{ marginRight: "10px" }} />
            Editar
          </MenuItem>
          <MenuItem onClick={() => setOpenDeleteModalAssunto(true)}>
            <DeleteOutlineOutlined sx={{ marginRight: "10px" }} />
            Deletar
          </MenuItem>
        </Menu>
      </Accordion>
      <EditAssunto
        openEdit={openEditAssunto}
        setEditAssunto={setOpenEditAssunto}
        editAssunto={editAssunto}
        setOpenEdit={setOpenEditAssunto}
        concursos={concursos}
        setConcursos={setConcursos}
        setAnchorEl={setAnchorEl}
        setSnackbar={setSnackbar}
        handleCloseMenuConcurso={handleCloseMenuConcurso}
        setAssuntos={setAssuntos}
        setAnchorElAssunto={setAnchorElAssunto}
      />
      <ModalDelete
        openDeleteModal={openDeleteModalAssunto}
        deleteLoad={loadingDelete}
        setOpenDeleteModal={setOpenDeleteModalAssunto}
        execute={() => {
          deleteAssunto(editAssunto?.id);
        }}
        severity={"error"}
        contentText={deleteBody}
        confirmText={confirmDelete}
      />
      {!!snackbar && (
        <Snackbar
          open
          onClose={() => setSnackbar(null)}
          autoHideDuration={2500}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </>
  );
}
