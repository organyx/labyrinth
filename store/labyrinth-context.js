import { createContext, useState } from 'react';
import useFetch from '../hooks/use-fetch';

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_PATH}`;

const initialState = {
  mazeId: '',
  playerName: '',
  maze: [],
  mazeVisual: '',
  gameState: {},
  gameOptions: {},
  movePlayer: ({ direction }) => {},
  makeNewGame: ({ height, width, playerName, difficulty }) => {},
  getMazeData: () => {},
  getVisualMazeData: () => {},
  resetMaze: () => {}
};

const LabyrinthContext = createContext(initialState);

export const LabyrinthContextProvider = ({ children }) => {
  const [mazeId, setMazeId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [maze, setMaze] = useState([]);
  const [mazeVisual, setMazeVisual] = useState('');
  const [gameState, setGameState] = useState({});
  const [gameOptions, setGameOptions] = useState({});

  const { error, isLoading, sendRequest } = useFetch();

  const setMazeIdHandler = (playerName, data) => {
    setMazeId(data.maze_id);
    setPlayerName(playerName);
  };

  const makeNewGame = async ({ height = 15, width = 15, playerName, difficulty = 1 }) => {
    const gameData = {
      'maze-height': height,
      'maze-width': width,
      'maze-player-name': playerName,
      difficulty
    };

    setGameOptions({ mazeHeight: height, mazeWidth: width, difficulty });

    sendRequest(
      {
        url: `${url}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: gameData
      },
      setMazeIdHandler.bind(null, playerName)
    );
  };

  const setMazeHandler = data => {
    setMaze(data.data);
    setGameState(data['game-state']);
  };

  const getMazeData = async () => {
    sendRequest(
      {
        url: `${url}/${mazeId}`,
        method: 'GET'
      },
      setMazeHandler
    );
  };

  const setVisualMazeHandler = data => {
    setMazeVisual(data);
  };

  const getVisualMazeData = async () => {
    sendRequest(
      {
        url: `${url}/${mazeId}/print`,
        method: 'GET'
      },
      setVisualMazeHandler
    );
  };

  const movePlayerHandler = async data => {
    await getVisualMazeData();

    const gameStatus = await checkGameStatus();

    if (gameStatus === 'lost') {
      return;
    }
    if (gameStatus === 'won') {
      return;
    }
  };

  const movePlayer = async ({ direction }) => {
    if (gameState?.state?.toLowerCase() !== 'active') {
      return;
    }

    const playerMove = {
      direction
    };

    sendRequest(
      {
        url: `${url}/${mazeId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: playerMove
      },
      movePlayerHandler
    );
  };

  const checkGameStatus = async () => {
    await getMazeData();
  };

  const resetMaze = () => {
    setGameState({});
    setMaze([]);
    setMazeVisual('');
    setMazeId('');
  };

  const context = {
    mazeId,
    playerName,
    maze,
    mazeVisual,
    gameState,
    makeNewGame,
    getMazeData,
    getVisualMazeData,
    movePlayer,
    checkGameStatus,
    resetMaze,
    error,
    isLoading
  };
  return <LabyrinthContext.Provider value={context}>{children}</LabyrinthContext.Provider>;
};

export default LabyrinthContext;
