import { useEffect, useContext } from 'react';

import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';

import GameBoard from './game-board';
import GameControls from './game-controls';
import GameInfo from './game-info';
import GameForm from './game-form';

const Main = () => {
  const { mazeId, getMazeData, getVisualMazeData, gameState } = useContext(LabyrinthContext);

  useEffect(() => {
    if (!mazeId) {
      return;
    }
    getMazeData(mazeId);
    getVisualMazeData(mazeId);
  }, [mazeId]);

  useEffect(() => {
    if (gameState.state === 'over') {
      return;
    }
    if (gameState.state === 'win') {
      return;
    }
  }, [gameState]);

  return (
    <main className={styles.main}>
      <GameInfo />

      <GameForm />

      <GameBoard />

      <GameControls />
    </main>
  );
};

export default Main;
