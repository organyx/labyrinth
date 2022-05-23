import { LabyrinthContextProvider } from '../store/labyrinth-context';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <LabyrinthContextProvider>
      <Component {...pageProps} />
    </LabyrinthContextProvider>
  );
}

export default MyApp;
