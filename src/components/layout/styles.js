import { display, fontSize, padding } from "@mui/system";

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
  iconButton: {
    border: "0.1rem solid #e0e0e0", // borda clara
    borderRadius: "6px", // deixa o botão mais quadrado (padrão é 50%)
    padding: "6px", // opcional: ajuste de espaço interno
  },
  boxDrwaer: {
    width: {
      xs: "80vw", // em telas pequenas: 80% da viewport
      sm: 400, // ≥600px
      md: 500, // ≥900px
      lg: 600, // ≥1200px
    },
    display: "flex",
    flexDirection: "column",

    padding: "10px",
  },
  boxDrwaerConfig: {
    width: {
      xs: "80vw", // em telas pequenas: 80% da viewport
      sm: 400, // ≥600px
      md: 500, // ≥900px
      lg: 600, // ≥1200px
    },
    padding: "10px",
  },
  boxDataSystem: {
    display: "flex",
    padding: "10px",
    gap: 1,
    flexDirection: "column",
  },
  list: {
    display: "flex",
    gap: 1,
    flexDirection: "column",
    width: "100%",
  },
  tabs: {
    color: "#FFFFFF",
    "& .MuiTabs-indicator": {
      backgroundColor: "#FFFFFF",
    },
  },
  iconMore: {
    fontSize: "1.1rem",
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
