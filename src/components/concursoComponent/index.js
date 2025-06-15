import {
  AddOutlined,
  ArticleOutlined,
  BookmarkBorderOutlined,
  Clear,
  DeleteOutlineOutlined,
  Edit,
  ExpandMore,
  ImportContactsOutlined,
  LaunchOutlined,
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
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, color, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import AddDisciplina from "../addDisciplina";
import { useNavigate } from "react-router-dom";
import EditDisciplina from "../editDisciplina";
import ModalDelete from "../modalDelete";
import EditConcurso from "../editConcurso";
import { render } from "@testing-library/react";

export default function ConcursoComponent(params) {
  const { concurso, setConcursos, allConcursos } = params;
  const [open, setOpen] = useState(false);
  const deleteBody = "Você tem certeza que deseja apagar esse concurso?";
  const confirmDelete = "Apagar concurso";
  const [openEdit, setOpenEdit] = useState(false);
  const [thisDisciplina, setThisDisciplina] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [editConcurso, setEditConcurso] = useState({});
  const theme = useTheme();
  const styles = useStyles(theme);
  const [buscarDisciplina, setBuscarDisciplina] = useState("");
  const [rows, setRows] = useState(concurso?.disciplinas);
  const [thisRow, setThisRow] = useState({});
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElConcurso, setAnchorElConcurso] = useState(null);
  const [openDeleteModalConcurso, setOpenDeleteModalConcurso] = useState(false);
  const [openEditConcurso, setOpenEditConcurso] = useState(false);
  const openMenu = Boolean(anchorEl);
  const openMenuConcurso = Boolean(anchorElConcurso);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const filteredRows = rows?.filter((row, index) => {
    row.numero = index;
    return row.disciplina
      ?.toLowerCase()
      ?.includes(buscarDisciplina?.toLowerCase());
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenuConcurso = () => {
    setAnchorElConcurso(null);
  };

  const handleClickMenuConcurso = (event) => {
    setAnchorElConcurso(event.currentTarget);
  };
  const handleClickAssunto = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteConcurso = (id) => {
    setLoadingDelete(true);
    const updatedConcursos = allConcursos.filter(
      (concurso) => concurso.id !== id
    );
    setConcursos(updatedConcursos);
    localStorage.setItem("concursos", JSON.stringify(updatedConcursos));
    setLoadingDelete(false);
    handleCloseMenuConcurso();
    setOpenDeleteModal(false);
    setOpenDeleteModalConcurso(false);
    setSnackbar({
      children: "Concurso deletado!",
      severity: "success",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setRows(concurso?.disciplinas);
  }, [concurso]);
  const columns = [
    {
      field: "disciplina",
      headerName: "Disciplina",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            onClick={() => navigate(`/concurso/disciplina/${params?.row?.id}`)}
            sx={styles.actions}
          >
            <ImportContactsOutlined
              fontSize="small"
              sx={{ color: "#ff9800" }}
            />
            <Typography sx={{ display: "inline" }}>
              {params.row.disciplina}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "assuntos",
      headerName: "Assuntos",
      width: 150,
      flex: 1,

      renderCell: (params) => {
        return (
          <Box
            onClick={() => navigate(`/concurso/disciplina/${params?.row?.id}`)}
            sx={styles.actions}
          >
            <Typography sx={{ display: "inline" }}>
              {`${params.row.assuntos?.length || 0} assunto${
                params.row.assuntos?.length > 1 ? "s" : ""
              }`}
            </Typography>
            <LaunchOutlined
              fontSize="small"
              sx={{
                display: "inline", // Garante que o ícone também será afetado pelo sublinhado
              }}
            />
          </Box>
        );
      },
      valueGetter: (params) => {
        return params?.length || 0;
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
              setThisDisciplina(params.row);
            }}
          >
            <SettingsOutlined />
          </IconButton>
        );
      },
    },
  ];

  const deleteDisciplina = (id) => {
    setLoadingDelete(true);

    setConcursos((prev) => {
      const updatedConcursos = prev.map((allConcursos) =>
        allConcursos.id === concurso?.id
          ? {
              ...allConcursos,
              disciplinas: allConcursos.disciplinas.filter(
                (disciplina) => disciplina.id !== thisDisciplina?.id
              ),
            }
          : allConcursos
      );

      // Save updated concursos to local storage
      localStorage.setItem("concursos", JSON.stringify(updatedConcursos));

      return updatedConcursos;
    });
    setLoadingDelete(false);
    handleClose();
    setOpenDeleteModal(false);
    setSnackbar({
      children: "Disciplina deletada!",
      severity: "success",
    });
  };
  return (
    <>
      <Accordion
        variant={color?.mode !== "dark" && "elevation"}
        elevation={3}
        key={concurso?.id}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ position: "relative", overflow: "hidden" }}
        >
          <Box sx={{ ...styles.containerBox, backgroundColor: "#2196f3" }} />
          <Box sx={styles.conatinerAcoesAccordion}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <BookmarkBorderOutlined sx={{ color: "#2196f3" }} />

              <Typography variant="mySubtitle">{concurso?.concurso}</Typography>
            </Box>

            <IconButton
              component="div"
              onClick={(e) => {
                e.stopPropagation();
                handleClickMenuConcurso(e);
                setEditConcurso(concurso);
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
              label={"Buscar disciplina"}
              value={buscarDisciplina}
              onChange={(e) => setBuscarDisciplina(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: buscarDisciplina ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setBuscarDisciplina("")}
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
                  setOpen(true);
                }}
              >
                Adicionar disciplina
              </Button>
            )}
            {windowWidth <= 725 && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <AddOutlined />
              </Button>
            )}
          </Box>
          <Box sx={styles.boxTable}>
            <DataGrid
              sx={styles.dataGrid}
              rows={filteredRows}
              columns={columns}
              autoHeight={true}
              disableRowSelectionOnClick
              disableColumnMenu
              pageSize={10}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
            />
          </Box>
          <AddDisciplina
            open={open}
            setOpen={setOpen}
            concursoId={concurso?.id}
            setConcursos={setConcursos}
            concursos={allConcursos}
            setSnackbar={setSnackbar}
          />
          <EditDisciplina
            open={openEdit}
            setOpen={setOpenEdit}
            setConcursos={setConcursos}
            thisConcurso={concurso}
            thisDisciplina={thisDisciplina}
            setOpenMenu={setAnchorEl}
            setSnackbar={setSnackbar}
          />

          <ModalDelete
            openDeleteModal={openDeleteModal}
            deleteLoad={loadingDelete}
            setOpenDeleteModal={setOpenDeleteModal}
            execute={() => {
              deleteDisciplina(thisDisciplina?.id);
            }}
            severity={"error"}
            contentText={deleteBody}
            confirmText={confirmDelete}
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
            <MenuItem onClick={() => setOpenDeleteModal(true)}>
              <DeleteOutlineOutlined sx={{ marginRight: "10px" }} />
              Deletar
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/concurso/disciplina/${thisRow?.id}`)}
            >
              <ArticleOutlined sx={{ marginRight: "10px" }} />
              Assuntos
            </MenuItem>
          </Menu>
        </AccordionDetails>
        <Menu
          id="basic-menu"
          anchorEl={anchorElConcurso}
          open={openMenuConcurso}
          onClose={handleCloseMenuConcurso}
        >
          <MenuItem
            onClick={() => {
              setOpenEditConcurso(true);
            }}
          >
            {" "}
            <Edit sx={{ marginRight: "10px" }} />
            Editar
          </MenuItem>
          <MenuItem onClick={() => setOpenDeleteModalConcurso(true)}>
            <DeleteOutlineOutlined sx={{ marginRight: "10px" }} />
            Deletar
          </MenuItem>
        </Menu>
      </Accordion>
      <EditConcurso
        openEdit={openEditConcurso}
        setEditConcurso={setOpenEditConcurso}
        editConcurso={editConcurso}
        setOpenEdit={setOpenEditConcurso}
        concursos={allConcursos}
        setConcursos={setConcursos}
        setAnchorEl={setAnchorEl}
        setSnackbar={setSnackbar}
        handleCloseMenuConcurso={handleCloseMenuConcurso}
      />
      <ModalDelete
        openDeleteModal={openDeleteModalConcurso}
        deleteLoad={loadingDelete}
        setOpenDeleteModal={setOpenDeleteModalConcurso}
        execute={() => {
          deleteConcurso(editConcurso?.id);
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
