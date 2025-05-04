const styles = (theme) => ({
  container: {
    width: "100%",
    height: "30px",
    maxWidth: "1000px",
    margin: "50px auto",
    padding: "20px",
  },
  containerAcoes: {
    width: "100%",

    display: "flex",
    justifyContent: "space-between",
  },
  textFieldBuscar: {
    width: "100%",
    maxWidth: "200px",
    margin: "0 20px 0 0",
  },
  containerPaper: {
    backgroundColor: theme.palette.mode === "dark" && "transparent",
    minHeight: "400px",
    padding: "20px",
  },
});
export default styles;
