import { useRef } from 'react';

import styles from './main.module.scss';

const Main = () => {
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
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The Game</h1>
      <h3 className={styles['game-status']}>Game Status:</h3>
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
    </main>
  );
};

export default Main;
