import {
  CalendarTodayOutlined,
  CheckOutlined,
  ClearOutlined,
  DataSaverOffOutlined,
  MenuBookOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { Chip, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import dayjs from "dayjs";
import useStyles from "./styles";
export default function CardAtividade(params) {
  const { atividade, handleClickAssunto, setThisRow } = params;
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Box variant="outlined" sx={styles.containerComponent}>
      <Box sx={styles.containerActions}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MenuBookOutlined
            sx={{ fontSize: "16px", marginRight: 1, opacity: 0.8 }}
          />
          <Typography variant="subtitle2" noWrap sx={styles.titleCard}>
            {atividade?.nomeAtividade}
          </Typography>
        </Box>

        <IconButton
          onClick={(e) => {
            setThisRow(atividade);
            handleClickAssunto(e);
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>

      <Box sx={styles.containerBody}>
        <Box>
          <Box sx={styles.boxIcon}>
            <DataSaverOffOutlined sx={{ color: "#00bcd4", fontSize: "15px" }} />
            <Typography sx={styles.nameParams}>
              Total de questões:{" "}
              <span style={{ fontWeight: "normal" }}>
                {atividade?.totalQuestoes}
              </span>
            </Typography>
          </Box>

          <Box sx={styles.boxIcon}>
            {" "}
            <CheckOutlined sx={{ color: "#4caf50", fontSize: "15px" }} />
            <Typography sx={styles.nameParams}>
              Total de acertos:{" "}
              <span style={{ fontWeight: "normal" }}>
                {atividade?.totalAcertos}
              </span>
            </Typography>
          </Box>
          <Box sx={styles.boxIcon}>
            <ClearOutlined sx={{ color: "#f44336", fontSize: "15px" }} />
            <Typography sx={styles.nameParams}>
              Total de erros:{" "}
              <span style={{ fontWeight: "normal" }}>
                {atividade?.totalQuestoes - atividade?.totalAcertos}
              </span>
            </Typography>
          </Box>
          <Box sx={styles.boxIcon}>
            <CalendarTodayOutlined
              sx={{ color: "#ff5722", fontSize: "15px" }}
            />
            <Typography sx={styles.nameParams}>
              Realizado em:{" "}
              <span style={{ fontWeight: "normal" }}>
                {dayjs(atividade?.date).format("DD/MM/YYYY")}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={styles.nameParams}>Análise:</Typography>
          <Box>
            {(() => {
              const analise = atividade?.totalAcertos
                ? (
                    (atividade?.totalAcertos / atividade?.totalQuestoes) *
                    100
                  ).toFixed(2) + "%"
                : "0%";
              const porcentagem = parseFloat(analise.replace("%", ""));
              return (
                <Chip
                  label={analise}
                  size="small"
                  sx={{
                    backgroundColor:
                      porcentagem >= 90
                        ? "chip.completed"
                        : porcentagem > 75 && porcentagem < 90
                        ? "chip.inProgress"
                        : "chip.pending",
                    color: "#ffffff",
                  }}
                />
              );
            })()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
