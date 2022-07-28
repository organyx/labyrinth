import { useContext } from 'react';
import { Paper } from '@mantine/core';
import Image from 'next/image';
import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';

const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const GameBoard = () => {
  const { gameState, mazeVisual, error, resetMaze } = useContext(LabyrinthContext);
  return (
    <Paper shadow="sm" p="md" withBorder>
      <div className={`${styles.grid} flex column`}>
        {gameState?.state?.toLowerCase() === 'active' && !error && <code className="display-linebreak">{mazeVisual}</code>}
        {(gameState.state === 'won' || gameState.state === 'over') && (
          <>
            <Image src={`${urlBase}${gameState['hidden-url']}`} alt={gameState['state-result']} height={300} width={300} />
            <button onClick={resetMaze}>Restart the game</button>
          </>
        )}
      </div>
    </Paper>
  );
};

export default GameBoard;
