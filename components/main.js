import { useEffect, useRef, useContext } from 'react';
import { Select, TextInput, Button } from '@mantine/core';
import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';

import { ponyNames } from '../util/constants';

import GameBoard from './game-board';
import GameControls from './game-controls';
import GameInfo from './game-info';

const Main = () => {
  const { mazeId, makeNewGame, getMazeData, getVisualMazeData, gameState } = useContext(LabyrinthContext);

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
      <GameInfo />

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

      <GameBoard />

      <GameControls />
    </main>
  );
};

export default Main;
