import { padding } from "@mui/system";

const styles = (theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: 4,
  },
  boxFlashCard: { maxHeight: "300px", overflowY: "auto", pr: 1 },
  containerFlashCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  containerAcoes: {
    display: "flex",
    gap: 1,
    width: "100%",
    justifyContent: "end",
    marginTop: "20px",
    marginBottom: "-20px",
  },
});

export default styles;
