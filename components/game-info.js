import { useContext } from 'react';
import { Title } from '@mantine/core';

import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';

const GameInfo = () => {
  const { gameState, playerName, error, mazeId } = useContext(LabyrinthContext);
  return (
    <>
      {mazeId && (
        <>
          <Title order={3}>The Game ID: {mazeId} </Title>
          <Title order={3}>Player: {playerName}</Title>
          {error && <Title order={3}>Error: {error}</Title>}
          <Title order={3} className={styles['game-status']}>
            Game Status: <span className={styles['game-status--highlight']}>{gameState.state}</span>
          </Title>
          <Title order={4}>{gameState['state-result']}</Title>
        </>
      )}
    </>
  );
};

export default GameInfo;
