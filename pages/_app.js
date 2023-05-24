import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import MainContextProvider from '@/context/mainContext';
import Navbar from '@/components/Navbar';
import { Stack } from '@mui/material';
import '@/styles/globals.css';
import Drawer from '@/components/Drawer';
import { useRouter } from 'next/router';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      i: 719,
      md: 960,
      lg: 1280,
      xl: 1920,
      d: 1313,
      f: 1127,
      g: 792,
      h: 1215,
      k: 1020,
      j: 810,
      l: 455,
      m: 485,
      n: 560
    },
  },
});
theme = responsiveFontSizes(theme);

export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <MainContextProvider>
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
          <Navbar />
          <Stack direction="row" spacing={3} >
            <Drawer />
            <Component {...pageProps} />
          </Stack>
        </Stack>
      </MainContextProvider>
    </ThemeProvider>
  )
}

