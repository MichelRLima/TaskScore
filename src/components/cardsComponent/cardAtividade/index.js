import { MenuBookOutlined, MoreHoriz } from "@mui/icons-material";
import { Chip, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";

export default function CardAtividade(params) {
  const { atividade, handleClickAssunto, setThisRow } = params;

  return (
    <Box
      variant="outlined"
      sx={{ width: "100%", padding: 2, backgroundColor: "transparent" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MenuBookOutlined
            sx={{ fontSize: "16px", marginRight: 1, opacity: 0.8 }}
          />
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              maxWidth: "210px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Total de questões:{" "}
            <span style={{ fontWeight: "normal" }}>
              {atividade?.totalQuestoes}
            </span>
          </Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Total de acertos:{" "}
            <span style={{ fontWeight: "normal" }}>
              {atividade?.totalAcertos}
            </span>
          </Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Total de erros:{" "}
            <span style={{ fontWeight: "normal" }}>
              {atividade?.totalQuestoes - atividade?.totalAcertos}
            </span>
          </Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Realizado em:{" "}
            <span style={{ fontWeight: "normal" }}>
              {dayjs(atividade?.date).format("DD/MM/YYYY")}
            </span>
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Análise:
          </Typography>
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
