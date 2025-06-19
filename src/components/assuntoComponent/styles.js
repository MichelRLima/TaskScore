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
  containerBox: {
    position: "absolute",
    width: "140px",
    height: "140px",
    right: -35,
    bottom: -5,
    borderRadius: "10px",
    transform: "rotate(50deg)",
    opacity: 0.3,
  },
  containerStatus: {
    display: "flex",
    gap: "10px",
    marginTop: "5px",
    marginLeft: "15px",
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
    marginBottom: "10px",
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
  textAtividade: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px", // Adjust the width as needed
    display: "inline-block",
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
});

export default styles;
