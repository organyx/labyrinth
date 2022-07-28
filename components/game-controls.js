import { useContext } from 'react';
import { VscArrowDown, VscArrowLeft, VscArrowRight, VscArrowUp } from 'react-icons/vsc';

import styles from './main.module.scss';

import useEventListener from '../hooks/use-event-listener';

import LabyrinthContext from '../store/labyrinth-context';

const GameControls = () => {
  const { movePlayer, gameState } = useContext(LabyrinthContext);

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
    <>
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
    </>
  );
};

export default GameControls;
