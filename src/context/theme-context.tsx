import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '0.05em'
        }
      }
    }
  },
  palette: {
    primary: {
      dark: '#2c2b4d',
      main: '#3f3f6e',
      light: '#65648b'
    },
    secondary: {
      dark: '#b2a564',
      main: '#ffec90',
      light: '#ffefa6'
    }
  },
  typography: {
    fontFamily: '"Ubuntu", "Noto Sans HK", sans-serif'
  }
})