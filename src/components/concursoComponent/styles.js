import { gap } from "@mui/system";

const styles = (theme) => ({
  containerLayout: {
    width: "100%",
    height: "30px",
    maxWidth: "1000px",
    margin: "50px auto",
  },
  containerPaper: {
    backgroundColor: theme.palette.mode === "dark" && "transparent",
    minHeight: "400px",
    padding: "20px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  containerButtons: {
    display: "flex",
    justifyContent: "end",
    margin: "20px 0 0 0 ",
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerWithoutConcurso: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "270px",
  },
  textFieldBuscar: {
    width: "100%",
    maxWidth: "200px",
    margin: "0 20px 0 0",
  },
  conatinerAcoesAccordion: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  accordionDetalhes: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0 0 0",
  },
  containerPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    marginTop: "auto",
    height: "50px",
  },
  containerTitle: {
    width: "100%",
    margin: "0 0 20px 0",
  },
  boxTable: {
    backgroundColor: "background.wallpaper",
    display: "flex",
    marginTop: "20px",
    width: "100%",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    gap: 1,
    cursor: "pointer", // Indica que é clicável
    "&:hover": {
      textDecoration: "underline", // Adiciona o sublinhado ao passar o mouse
      color: "primary.main", // Muda a cor do texto ao passar o mouse
    },
  },
  dataGrid: {
    display: "grid",
    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
      py: "5px",
    },
    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {},
    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
      py: "22px",
    },
    fontSize: 15,
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
  },
  containerBox: {
    position: "absolute",
    width: "240px",
    height: "240px",
    right: -160,
    bottom: -70,
    borderRadius: "10px",
    transform: "rotate(50deg)",
    opacity: 0.3,
  },
  descriptionAccordion: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  containerIcon: {
    display: "flex",
    alignItems: "center",
    gap: "1px",
    marginBottom: "5px",
  },
  containerStatus: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "20px",
    marginTop: "5px",
    gap: "10px",
  },
});

export default styles;
