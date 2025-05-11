const styles = (theme) => ({
  containerLayout: {
    width: "100%",
    height: "30px",
    maxWidth: "1000px",
    margin: "50px auto",
    padding: "20px",
  },
  containerPaper: {
    backgroundColor: "transparent",
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
});

export default styles;
