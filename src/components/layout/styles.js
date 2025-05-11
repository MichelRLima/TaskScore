import { padding } from "@mui/system";

const styles = (theme) => ({
  containerLayout: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100px",
    display: "flex",
    padding: "0 10px",
    backgroundColor: "#12334C",
  },
  tab: {
    minWidth: "60px",
    height: "100%",
    maxWidth: "200px",
    justifyContent: "start",
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: "0.875rem",
    "&.Mui-selected": {
      color: "#FFFFFF",
    },
    "&:hover": {
      backgroundColor: "#00000021",
    },
  },
  tabs: {
    color: "#FFFFFF",
    "& .MuiTabs-indicator": {
      backgroundColor: "#FFFFFF",
    },
  },
  iconMore: {
    color: "#FFFFFF",
    "& svg": {
      color: "#FFFFFF",
    },
  },
  containerImage: {
    width: "100%", // Largura definida para 100% do Box
    height: "100%", // Altura definida para 100% do Box
    objectFit: "cover", // A imagem cobre o espaço sem distorcer
    borderRadius: "10px",
  },
});

export default styles;
