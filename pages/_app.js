import { LabyrinthContextProvider } from '../store/labyrinth-context';
import '../styles/globals.scss';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light'
      }}
    >
      <LabyrinthContextProvider>
        {/* <Component {...pageProps} /> */}

        <Component {...pageProps} />
      </LabyrinthContextProvider>
    </MantineProvider>
  );
}

export default MyApp;
