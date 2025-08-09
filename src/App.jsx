import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { purple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fefefe'
      },
      secondary: purple,
      // secondary:{
      //   main: purple[500]
      // },
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
  });
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Notes />} />`
          <Route path="/create" element={<Create />} />`
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
