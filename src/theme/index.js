import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid/locales";

const theme = (colorMode) =>
  createTheme(
    {
      palette: {
        mode: !colorMode ? "light" : "dark",
        primary: {
          main: !colorMode ? "#212B36" : "#FFFFFF",
        },

        secondary: {
          main: "#FA541C",
        },
        disabled: {
          main: "#C0C0C0",
        },
        white: {
          main: "#ffffff",
        },
        success: {
          main: !colorMode ? "#00A76F" : "#00A76F",
          medium: !colorMode ? "#D8FBDE" : "#0A5554",
          light: !colorMode ? "#E7F8F2" : "#9CCBB6",
        },

        background: {
          default: !colorMode ? "#ffffff" : "#161c24",
          wallpaper: !colorMode ? "#f5f4f0" : "#161c24",
          paper: !colorMode ? "#ffffff" : "#212B36",
        },
        chartPallet: [
          "#00A76F",
          "#FA541C",
          "#078DEE",
          "#F2779A",
          "#1AD5A6",
          "#87431D",
        ],
        chip: {
          pending: !colorMode ? "#E83750" : "#A61328",
          inProgress: !colorMode ? "#FA541C" : "#FA541C",
          completed: !colorMode ? "#2E7D32" : "#00A76F",
          waitingReview: !colorMode ? "#078DEE" : "#078DEE",
          waitingReturn: !colorMode ? "#5B2E87" : "#502876",
          arquive: !colorMode ? "#777777" : "#424242",
          attention: !colorMode ? "#DEDE4B" : "#E8E84F",
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 1830,
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1200,
        },
        text: {
          textContrast: !colorMode ? "#ffffff" : "#000000",
        },
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            body: {
              backgroundColor: themeParam.palette.background.wallpaper,
            },
          }),
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: !colorMode ? "#ffffff" : "#252C35",
            },
          },
        },
        MuiFilledInput: {
          defaultProps: {
            sx: {
              borderRadius: "8px",
            },
            disableUnderline: true,
          },
        },
        MuiInputLabel: {
          styleOverrides: { shrink: { fontWeight: 600 } },
        },
        MuiRadio: {
          styleOverrides: {
            root: {
              "&.Mui-checked": {
                color: "#FA541C",
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
      },

      typography: {
        title: {
          fontSize: "24px",
          fontWeight: 900,
        },
        mySubtitle: {
          fontSize: "18px",
          fontWeight: 600,
        },
        mySubtitle2: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    ptBR
  );

export default theme;
