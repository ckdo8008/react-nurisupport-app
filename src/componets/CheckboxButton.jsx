import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

// checked와 onChange를 props로 추가합니다.
const CheckboxButton = ({ checked, onChange, text, disabled }) => {

  return (
    <Box sx={[
      {
        border:'1px solid',
        borderColor: disabled? '#c8cacb' : '#313639',
        transition: 'all 200ms linear',
        color: '#313639'
      },
      checked && {
        background: '#313639',
        color: '#fff'
      },
      disabled && {
        background: checked? '#c8cacb': '',
        borderColor : '#c8cacb'
      },
      !disabled && checked && {
        '&:hover': { 
          backgroundColor: '#d5001c',
          borderColor: '#d5001c'
        },
      },
      !disabled && !checked && {
        '&:hover': { 
          borderColor: '#d5001c',
          color: '#d5001c'
        },
      }
    ]
    }
    onClick={() => !disabled && onChange != undefined && onChange()}
    width={170}
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="50px"  
    >
      <Grid container >
        <Grid item xs={3}>
          {checked ? <CloseIcon/> : <AddIcon sx={{
            color: disabled ? '#c8cacb' : '#313639'
          }} />}
        </Grid>
        <Grid item xs display="flex" alignItems="center">
          <Typography variant='body1' 
          sx={[{
            userSelect: 'none', 
            color: '#313639'
            },
            checked && {
              color: '#fff'
            },
            disabled && {
              color : '#c8cacb'
            }]            
            }>
          {text}
          </Typography>
          <Checkbox
            checked={checked}
            onChange={() => !onChange && onChange()}
            disabled={disabled}
            sx={{ display: 'none' }}
          />
        </Grid>
      </Grid>
    </Box>
    // </Button>
  );
}

export default CheckboxButton;