import { width } from "@mui/system";

const styles = (theme) => ({
  containerComponent: {
    width: "100%",
    padding: "10px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
  },
  containerBox: {
    position: "absolute",
    width: "80px",
    height: "80px",
    right: -25,
    bottom: 5,
    borderRadius: "10px",
    transform: "rotate(50deg)",
    opacity: 0.3,
  },
  icon: {
    fontSize: 35,
    position: "absolute",
    right: 7,
    bottom: 25,
  },
  valueCard: { fontSize: "25px", fontWeight: "bold" },
});

export default styles;
