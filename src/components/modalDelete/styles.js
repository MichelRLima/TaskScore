import { margin } from "@mui/system";

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

    borderRadius: "12px",
    position: "relative",
    bgcolor: "background.default",
    padding: "0px 0px 20px 0px",
  },
  headerIcon: { width: "20px", height: "20px", color: "#ffffff" },
  headerTitle: { color: "#ffffff" },
  contentBox: { display: "flex", flexDirection: "column", gap: 2 },
  textBox: {
    margin: "20px 0px 0px 0px",
    textWrap: "wrap",
    padding: " 20px",
    textAlign: "center",
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
});

export default styles;
