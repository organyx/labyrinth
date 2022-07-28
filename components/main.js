import { useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { Select, TextInput, Button, Title, Paper } from '@mantine/core';
import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';

import { ponyNames } from '../util/constants';
import GameControls from './game-controls';

const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const Main = () => {
  const { mazeId, mazeVisual, playerName, makeNewGame, getMazeData, getVisualMazeData, resetMaze, error, isLoading, gameState } =
    useContext(LabyrinthContext);

  const playerNameRef = useRef(null);
  const mazeWidthRef = useRef(null);
  const mazeHeightRef = useRef(null);
  const mazeDifficultyRef = useRef(null);

  const formSubmitHandler = async e => {
    e.preventDefault();

    const playerName = playerNameRef?.current?.value || 'Twilight Sparkle';
    const mazeWidth = +mazeWidthRef?.current?.value || 15;
    const mazeHeight = +mazeHeightRef?.current?.value || 15;
    const mazeDifficulty = +mazeDifficultyRef?.current?.value || 1;

    makeNewGame({
      height: mazeHeight,
      width: mazeWidth,
      difficulty: mazeDifficulty,
      playerName
    });
  };

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
      <Title order={3}>The Game ID: {mazeId} </Title>
      <Title order={3}>Player: {playerName}</Title>
      {error && <Title order={3}>Error: {error}</Title>}
      <Title order={3} className={styles['game-status']}>
        Game Status: <span className={styles['game-status--highlight']}>{gameState.state}</span>
      </Title>

      <Title order={4}>{gameState['state-result']}</Title>
      {!mazeId && (
        <form onSubmit={formSubmitHandler} className={`flex column ${styles['game-settings']}`}>
          <Select placeholder="Pony Name" label="Choose your pony" data={ponyNames} ref={playerNameRef} />
          <TextInput type="number" id="mazeWidth" label="Maze Width" placeholder="15" min={15} max={25} ref={mazeWidthRef} />
          <TextInput type="number" id="mazeHeight" label="Maze Height" placeholder="15" min={15} max={25} ref={mazeHeightRef} />
          <TextInput type="number" id="difficulty" label="Difficulty" placeholder="1" ref={mazeDifficultyRef} />

          <Button type="submit" title="Start Game">
            Start Game
          </Button>
        </form>
      )}

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

      <GameControls />
    </main>
  );
};

export default Main;
