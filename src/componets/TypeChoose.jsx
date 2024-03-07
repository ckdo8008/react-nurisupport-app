import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { ThemeProvider, createTheme, experimentalStyled as styled } from '@mui/material/styles'


import { useNavigate } from 'react-router-dom';
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function TypeChoose(props) {
  const navigator = useNavigate();
  const theme = createTheme({
    palette: {
      nurirobot: {
        main: '#fff',
        contrastText: '#010205',
      },
      optionbtn: {
        main: '#313639',

      },
    },
    components: {
      MuiTypography:{
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
            height: '100px',
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
      }
    }    
  });

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
  }));  

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ElevationScroll {...props}>
      <AppBar sx={{alignItems: 'center'}} color='nurirobot'>
        <Toolbar>
          <Typography variant="h5" onClick={() => navigator('/')}>
            누리로봇&nbsp;&nbsp;Nurirobot
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Toolbar />
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="h6">
          구동기(모터) 형태 선택
          {/* Select actuator (motor) type */}
        </Typography>
      </Breadcrumbs>      
      <Box sx={{ my: 2 }}>
        {/* {[...new Array(12)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')} */}
          <Grid container spacing={2} columns={{ xs: 2, md: 2 }}>
          <Grid item xs={1}>
              <Item>
                <Typography variant="h6">
                회전형<br/>
                (Rotary)
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Typography variant="h6">
                직선형<br/>
                (Linear)
                </Typography>
              </Item>
            </Grid>             
            <Grid item xs={1}>
              <Item>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigator('/choose/joint')}>
                  로봇 관절<br/>
                  Joint
                </Button>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigator('/choose/linear')} disabled>
                  리니어<br/>
                  Linear
                </Button>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>

              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigator('/choose/culinder')} disabled>
                  실린더<br/>
                  Cylinder
                </Button>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigator('/choose/wheel')} disabled>
                  로봇 바퀴<br/>
                  Wheel
                </Button>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigator('/choose/lift')} disabled>
                  리프트 컬럼<br/>
                  Lift Column
                </Button>
              </Item>
            </Grid>
          </Grid>
      </Box>
    </Container>
  </ThemeProvider>
  );
}