import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "./styles";

export default function ModalDelete(params) {
  const styles = useStyles();
  const {
    openDeleteModal = false,
    deleteLoad = false,
    setOpenDeleteModal = () => {},
    execute = () => {},
    severity = "",
    contentText = "",
    confirmText = "",
  } = params;

  return (
    <Modal
      open={openDeleteModal}
      onClose={() => {
        setOpenDeleteModal(false);
      }}
      sx={styles.modal}
    >
      <Paper sx={styles.paper}>
        <Box sx={styles.boxPaper}>
          <Box
            // tipos de modal detele 1: error, 2: warn, 3: info, 4: success
            sx={{
              bgcolor:
                severity === "error"
                  ? "chip.pending"
                  : severity === "warning"
                  ? "secondary.main"
                  : severity === "info"
                  ? "chip.waitingReview"
                  : severity === "success"
                  ? "success.main"
                  : "chip.pending",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            {/* {severity === "warning" ? (
              <Warning sx={styles.headerIcon} />
            ) : severity === "info" ? (
              <Info sx={styles.headerIcon} />
            ) : severity === "success" ? (
              <CheckCircle sx={styles.headerIcon} />
            ) : (
              <Error sx={styles.headerIcon} />
            )} */}

            <Typography variant="title" sx={styles.headerTitle}>
              Atenção!
            </Typography>
          </Box>
          <Box sx={styles.contentBox}>
            <Box sx={styles.textBox}>
              <Typography variant="mySubtitle">
                {contentText
                  ? contentText
                  : "Se você prosseguir com a operação, o item será deletado permanentemente!"}
              </Typography>
            </Box>

            <Stack
              direction={"row"}
              gap={10}
              justifyContent={"center"}
              width={"100%"}
            >
              <Button
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              >
                CANCELAR
              </Button>
              <Button
                onClick={execute}
                disabled={deleteLoad}
                variant="contained"
                sx={{
                  bgcolor:
                    severity === "error"
                      ? "chip.pending"
                      : severity === "warning"
                      ? "secondary.main"
                      : severity === "info"
                      ? "chip.waitingReview"
                      : severity === "success"
                      ? "success.main"
                      : "chip.pending",
                  color: "#ffffff",
                }}
              >
                {confirmText ? confirmText : "CONFIRMAR"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
