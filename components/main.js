import { useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { VscArrowDown, VscArrowLeft, VscArrowRight, VscArrowUp } from 'react-icons/vsc';

import styles from './main.module.scss';

import LabyrinthContext from '../store/labyrinth-context';
import useEventListener from '../hooks/use-event-listener';

const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const Main = () => {
  const {
    mazeId,
    mazeVisual,
    playerName,
    makeNewGame,
    getMazeData,
    getVisualMazeData,
    movePlayer,
    resetMaze,
    error,
    isLoading,
    gameState
  } = useContext(LabyrinthContext);

  const playerNameRef = useRef(null);
  const mazeWidthRef = useRef(null);
  const mazeHeightRef = useRef(null);
  const mazeDifficulty = useRef(null);

  const formSubmitHandler = async e => {
    e.preventDefault();

    const playerName = playerNameRef?.current?.value || 'Twilight Sparkle';
    const mazeWidth = +mazeWidthRef?.current?.value || 15;
    const mazeHeight = +mazeHeightRef?.current?.value || 15;
    const mazeDifficulty = +mazeDifficulty?.current?.value || 1;

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

  const onKeyDownHandler = ({ key }) => {
    if (key === 'ArrowUp') {
      movePlayer({ direction: 'north' });
    } else if (key === 'ArrowDown') {
      movePlayer({ direction: 'south' });
    } else if (key === 'ArrowLeft') {
      movePlayer({ direction: 'west' });
    } else if (key === 'ArrowRight') {
      movePlayer({ direction: 'east' });
    }
  };

  useEventListener('keydown', onKeyDownHandler);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        The Game {mazeId} {playerName}
      </h1>
      {error && <h3>Error: {error}</h3>}
      <h3 className={styles['game-status']}>Game Status:</h3>
      <span className={styles['game-status--highlight']}>{gameState.state}</span>
      <span className={styles['game-status--message']}>{gameState['state-result']}</span>
      {!mazeId && (
        <form onSubmit={formSubmitHandler} className={`flex column ${styles['game-settings']}`}>
          <div className={styles['input-group']}>
            <label htmlFor="playerName">Enter player name</label>
            <input type="text" id="playerName" placeholder="Enter your name" ref={playerNameRef} />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="mazeWidth">Maze Width</label>
            <input type="number" id="mazeWidth" placeholder="15" ref={mazeWidthRef} min={15} max={25} />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="mazeHeight">Maze Height</label>
            <input type="number" id="mazeHeight" placeholder="15" ref={mazeHeightRef} min={15} max={25} />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="mazeDifficulty">Difficulty</label>
            <input type="number" id="mazeDifficulty" placeholder="1" ref={mazeDifficulty} />
          </div>

          <button>Start game</button>
        </form>
      )}

      <div className={`${styles.grid} flex column`}>
        {gameState?.state?.toLowerCase() === 'active' && !error && <code className="display-linebreak">{mazeVisual}</code>}
        {(gameState.state === 'won' || gameState.state === 'over') && (
          <>
            <Image src={`${urlBase}${gameState['hidden-url']}`} alt={gameState['state-result']} height={300} width={300} />
            <button onClick={resetMaze}>Restart the game</button>
          </>
        )}
      </div>

      {gameState?.state?.toLowerCase() === 'active' && (
        <div className={`${styles.controls} flex column`}>
          <div className={styles.card} onClick={() => movePlayer({ direction: 'north' })}>
            <VscArrowUp />
          </div>
          <div className="flex row">
            <div className={styles.card} onClick={() => movePlayer({ direction: 'west' })}>
              <VscArrowLeft />
            </div>
            <div className={styles.card} onClick={() => movePlayer({ direction: 'south' })}>
              <VscArrowDown />
            </div>
            <div className={styles.card} onClick={() => movePlayer({ direction: 'east' })}>
              <VscArrowRight />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
