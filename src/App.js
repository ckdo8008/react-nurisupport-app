// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Test from './componets/test';
import Choose from './componets/Choose';
import Index from './componets/index';
import TypeChoose from './componets/TypeChoose';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './componets/theme';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Test />} />
            <Route path='/choosetest' element={<Index />} />
            <Route path='/choose' element={<TypeChoose />} />
            <Route path='/choose/:type' element={<Choose />} />
            <Route path='*' element={<Test />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;