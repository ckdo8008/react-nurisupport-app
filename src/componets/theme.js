import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    nurirobot: {
      main: '#fff',
      contrastText: '#010205',
    },
    optionbtn: {
      main: '#313639',
    },
    optionbtn_active: {
      main: '#f00',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'NanumBarunGothic',
          userSelect: 'none'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        color: "optionbtn",
      },
      styleOverrides: {
        root: {
          fontFamily: 'NanumBarunGothic',
          "&.Mui-disabled": {
            color: "#c8cacb"
          },
          width: '80%',
          height: '50px',
          borderRadius: 2,
          alignContent: 'start',
          textAlign: 'left'
        }
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          background: '#eee',
          padding: "1.2rem .5rem",
        }
      }
    },
  }
});

export default theme;