const styles = (theme) => ({
  containerComponent: {
    backgroundColor: "#12334B",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "start",
    height: "64px",
  },
  containerImg: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: 130,
    height: 50,
  },
  buttonGrup: {
    width: "100%",
    padding: "10px",
  },
  containerIconTema: {
    display: "flex",
    alignItems: "center",

    px: 2,
    mt: 1,
    mb: 1,
  },
  description: {
    display: "block",
    width: "100%",
    fontSize: "10px",
    textAlign: "justify",
    color: "#a3a3a3",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
  paperDescription: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    p: 1,
    overflow: "hidden",
  },
});

export default styles;
