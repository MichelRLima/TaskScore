import { Box, useTheme } from "@mui/system";
import useStyles from "./styles";
import { Paper, Typography } from "@mui/material";
export default function CardComponent(params) {
  const {
    valueCard = 0,
    descriptionCard = "Description",
    typeCard = 1,
    icon = null,
  } = params;

  const colorCard = {
    1: "#f44336", // Red
    2: "#4caf50", // Green
    3: "#2196f3", // Blue
    4: "#ff9800", // Orange
    5: "#9c27b0", // Purple
    6: "#00bcd4", // Cyan
    7: "#9e9e9e", // Grey
    8: "#ffc107", // Yellow
    9: "#673ab7", // Deep Purple
    10: "#3f51b5", // Indigo
    11: "#e91e63", // Pink
    12: "#8bc34a", // Light Green
    13: "#ff5722", // Deep Orange
  };

  const theme = useTheme();
  const styles = useStyles(theme);
  const Icon = icon;
  return (
    <Paper variant="outlined" sx={styles.containerComponent}>
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ ...styles.valueCard, color: colorCard[typeCard] }}>
          {valueCard}
        </Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {descriptionCard}
        </Typography>

        <Box
          sx={{ ...styles.containerBox, backgroundColor: colorCard[typeCard] }}
        />
        {Icon && <Icon sx={{ ...styles.icon, color: colorCard[typeCard] }} />}
      </Box>
    </Paper>
  );
}
