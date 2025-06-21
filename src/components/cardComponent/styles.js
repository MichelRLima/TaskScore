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
    width: "150px",
    height: "150px",
    right: -100,
    bottom: -35,
    borderRadius: "10px",
    transform: "rotate(50deg)",
  },
  titleDescription: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  containerIcon: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  containerBoxStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    opacity: 0.3,
  },
  icon: {
    fontSize: 35,
    position: "absolute",
    right: 35,
    bottom: 15,
    left: 20,

    transform: "rotate(-50deg)",
  },
  valueCard: { fontSize: "25px", fontWeight: "bold" },
});

export default styles;
