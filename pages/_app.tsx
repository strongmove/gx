import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Login from '@/components/Apps/login/login';
import { theme } from '@root/theme/theme';
import { ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Login>
        <Component {...pageProps} />
      </Login>
    </ThemeProvider>
  );
}

export default MyApp;
