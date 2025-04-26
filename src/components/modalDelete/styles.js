const styles = (props) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "400px",
    //width: "20.9vw",
    height: "500px",
    borderRadius: "12px",
    position: "relative",
    bgcolor: "background.default",
    padding: "0px 0px 20px 0px",
  },
  headerIcon: { width: "110px", height: "110px", color: "#ffffff" },
  headerTitle: { color: "#ffffff" },
  contentBox: { display: "flex", flexDirection: "column", gap: 2 },
  textBox: {
    textWrap: "wrap",
    padding: "0px 20px",
    textAlign: "center",
    display: "flex",
    width: "400px",
    alignItems: "center",
    height: "226px",
  },
});

export default styles;
