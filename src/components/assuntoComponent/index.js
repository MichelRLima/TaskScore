import {
  AddOutlined,
  CalendarTodayOutlined,
  CheckOutlined,
  Clear,
  ClearOutlined,
  DataSaverOffOutlined,
  DeleteOutlineOutlined,
  Edit,
  ExpandMore,
  MoreVertOutlined,
  Search,
  SettingsOutlined,
  SignalCellularAltOutlined,
  StickyNote2Outlined,
  TopicOutlined,
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
  Pagination,
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
    "Você tem certeza que deseja apagar essa atividade?";
  const confirmDelete = "Deletar assunto";
  const confirmDeleteAtividade = "Deletar atividade";
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [editAssunto, setEditAssunto] = useState({});
  const [analiseDataAtividades, setAnaliseDataAtividades] = useState({
    totalAtividades: 0,
    totalAcertos: 0,
    totalErros: 0,
  });
  const theme = useTheme();
  const styles = useStyles(theme);
  const [buscarAtividade, setBuscarAtividade] = useState("");
  const [rows, setRows] = useState(assunto?.atividades || []);
  const [thisRow, setThisRow] = useState({});
  const [dataGrafico, setDatagrafico] = useState([]);
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
    analiseAtividade(assunto);
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
    const agrupadoPorData = {};

    atividades.forEach((item) => {
      const dataFormatada = dayjs(item.date).format("DD/MM/YYYY");

      if (!agrupadoPorData[dataFormatada]) {
        agrupadoPorData[dataFormatada] = {
          Data: dataFormatada,
          DataOriginal: dayjs(item.date).toDate(),
          Total: 0,
          Acertos: 0,
          Erros: 0,
          Nome: "", // opcional: pode ser removido ou concatenado se quiser mostrar vários nomes
        };
      }

      agrupadoPorData[dataFormatada].Total += Number(item.totalQuestoes);
      agrupadoPorData[dataFormatada].Acertos += Number(item.totalAcertos);
      agrupadoPorData[dataFormatada].Erros +=
        Number(item.totalQuestoes) - Number(item.totalAcertos);

      // Se quiser manter os nomes das atividades combinadas:
      agrupadoPorData[dataFormatada].Nome += `${item.nomeAtividade}, `;
    });

    return Object.values(agrupadoPorData)
      .map((item) => ({
        ...item,
        Nome: item.Nome.replace(/,\s*$/, ""), // remove a última vírgula
      }))
      .sort((a, b) => new Date(a.DataOriginal) - new Date(b.DataOriginal))
      .slice(0, 30);
  };

  function analiseAtividade(obj) {
    const atividades = obj.atividades || [];

    let totalAtividades = atividades.length;
    let totalAcertos = 0;
    let totalErros = 0;

    atividades.forEach((atividade) => {
      const acertos = parseInt(atividade.totalAcertos);
      const questoes = parseInt(atividade.totalQuestoes);

      totalAcertos += acertos;
      totalErros += questoes - acertos;
    });
    setAnaliseDataAtividades({
      totalAtividades: totalAtividades,
      totalAcertos: totalAcertos,
      totalErros: totalErros,
    });
  }

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
            <strong>Atividades:</strong> {atividade}
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
    );
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

  const columns = [
    {
      field: "nomeAtividade",
      headerName: "Atividade",
      width: 150,
      flex: 1,
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StickyNote2Outlined fontSize="small" sx={{ color: "#3f51b5" }} />
          Atividade
        </Typography>
      ),
    },
    {
      field: "totalQuestoes",
      headerName: "Total de questões",
      minWidth: 180,
      flex: 1,
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DataSaverOffOutlined fontSize="small" sx={{ color: "#00bcd4" }} />
          Total de questões
        </Typography>
      ),
    },
    {
      field: "totalAcertos",
      headerName: "Acertos",
      minWidth: 100,
      flex: 1,
      valueGetter: (params, row) => {
        return parseInt(row?.totalAcertos) || 0;
      },
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckOutlined fontSize="small" sx={{ color: "#4caf50" }} />
          Acertos
        </Typography>
      ),
    },
    {
      field: " ",
      headerName: "Erros",
      minWidth: 100,
      flex: 1,
      valueGetter: (params, row) => {
        return row?.totalQuestoes - row?.totalAcertos;
      },
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ClearOutlined fontSize="small" sx={{ color: "#f44336" }} />
          Erros
        </Typography>
      ),
    },
    {
      field: "analise",
      headerName: "Análise",
      width: 100,
      flex: 1,
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SignalCellularAltOutlined
            fontSize="small"
            sx={{ color: "#ff9800" }}
          />
          Análise
        </Typography>
      ),
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
      renderHeader: () => (
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayOutlined fontSize="small" sx={{ color: "#ff5722" }} />
          Data
        </Typography>
      ),
      valueGetter: (params, row) => {
        return dayjs(row?.date).toDate();
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
          sx={{ position: "relative", overflow: "hidden" }}
        >
          <Box sx={{ ...styles.containerBox, backgroundColor: "#9c27b0" }} />
          <Box sx={styles.conatinerAcoesAccordion}>
            <Box sx={styles.descriptionAccordion}>
              <Box sx={styles.containerIcon}>
                <TopicOutlined sx={{ color: "#9c27b0", fontSize: "15px" }} />
                <Typography sx={{ fontSize: "10px" }}>Assunto:</Typography>
              </Box>
              <Typography
                variant="mySubtitle"
                sx={{ marginLeft: "15px", marginBottom: "5px" }}
              >
                {assunto?.assunto}
              </Typography>
              <Box sx={styles.containerStatus}>
                <Box sx={styles.containerIcon}>
                  <StickyNote2Outlined
                    sx={{ color: "#3f51b5", fontSize: "15px" }}
                  />
                  <Typography sx={{ fontSize: "10px" }}>
                    Atividades: {analiseDataAtividades?.totalAtividades}
                  </Typography>
                </Box>
                <Box sx={styles.containerIcon}>
                  <CheckOutlined sx={{ color: "#4caf50", fontSize: "15px" }} />
                  <Typography sx={{ fontSize: "10px" }}>
                    Acertos: {analiseDataAtividades?.totalAcertos}
                  </Typography>
                </Box>
                <Box sx={styles.containerIcon}>
                  <ClearOutlined sx={{ color: "#f44336", fontSize: "15px" }} />
                  <Typography sx={{ fontSize: "10px" }}>
                    Erros: {analiseDataAtividades?.totalErros}
                  </Typography>
                </Box>
              </Box>
            </Box>

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

                {/* Paginação com bolinhas */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_, page) => setCurrentPage(page)}
                      color="primary"
                      shape="rounded"
                      size="small"
                    />
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
                data={dataGrafico}
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
