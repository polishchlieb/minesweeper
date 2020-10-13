import React from 'react';
import GameContext from '../../GameContext';
import GameReducer from '../../GameReducer';
import Board from '../Board/Board';
import GameInfo from '../GameInfo/GameInfo';

const Game = ({ width, height, bombCount }) => {
  const [state, dispatch] = React.useReducer(GameReducer, { fields: [] });

  React.useEffect(() => {
    // generate empty fields
    const fields = [];
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x)
        fields.push({ x, y });
    }

    // generate bombs
    let currentBombCount = 0;
    while (bombCount > currentBombCount) {
      const randomField = fields[Math.floor(Math.random() * fields.length)];
      randomField.hasBomb = true;
      currentBombCount = fields.reduce(
        (acc, { hasBomb }) => hasBomb ? acc + 1 : acc, 0
      );
    }

    dispatch({ type: 'SET_FIELDS', payload: fields });
  }, [width, height, bombCount]);

  React.useEffect(() => {
    const revealedCount = state.fields
      .filter(f => f.isVisible)
      .reduce((acc) => acc + 1, 0);

    if (revealedCount === width * height - bombCount)
      dispatch({ type: 'WIN' });
  }, [state.fields]);

  return (
    <GameContext.Provider value={{
      dispatch,
      fields: state.fields,
      boardDimensions: { width, height },
      gameOver: state.gameOver,
      won: state.won,
      bombCount
    }}>
      <GameInfo />
      <Board />
      {state.gameOver && <h1>przegrałeś grę</h1>}
      {state.won && <h1>wygrałeś</h1>}
    </GameContext.Provider>
  );
}

export default Game;