import React from 'react';
import GameContext from '../../GameContext';
import bombImg from '../../../assets/bomb.svg';
import flagImg from '../../../assets/flag.svg';
import './Field.css';

const isCorrectPosition = ([width, height], [posX, posY]) =>
  posX >= 0 && posX <= width - 1 && posY >= 0 && posY <= height - 1;

const getNearFields = ({ fields, width, height }, [x, y]) =>
  [
    [x - 1, y + 1], [x, y - 1], [x + 1, y + 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y - 1], [x, y + 1], [x + 1, y - 1]
  ]
    .filter((pos) => isCorrectPosition([width, height], pos))
    .map(([posX, posY]) => fields[posY * width + posX]);

const calculateNearBombs = (data, pos) =>
  getNearFields(data, pos)
    .reduce((acc, { hasBomb }) => hasBomb ? acc + 1 : acc, 0);

const revealRecursively = (data, field) => {
  const { x, y } = field;

  field.isVisible = true;
  field.flagged = false;

  const nearBombs = calculateNearBombs(data, [x, y]);
  if (nearBombs !== 0)
    return;

  const toReveal = getNearFields(data, [x, y])
    .filter((v) => !v.hasBomb && !v.isVisible);

  for (const neighbour of toReveal)
    revealRecursively(data, neighbour);
}

const Field = ({ x, y }) => {
  const { fields, boardDimensions, dispatch, gameOver, won }
    = React.useContext(GameContext);

  const { width, height } = boardDimensions;

  const index = y * width + x;
  const field = fields[index];
  const { hasBomb, isVisible, flagged } = field;

  const handleLeftClick = () => {
    if (isVisible || gameOver || won)
      return;

    if (hasBomb) {
      dispatch({ type: 'GAME_OVER' });
      return;
    }

    revealRecursively({ fields, width, height }, field);
    dispatch({ type: 'UPDATE_FIELDS' });
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if (isVisible || gameOver || won)
      return;

    field.flagged = !flagged;
    dispatch({ type: 'UPDATE_FIELDS' });
  }

  if (!field.neighbourBombs)
    field.neighbourBombs = calculateNearBombs({ fields, width, height }, [x, y]);

  const displayBomb = (gameOver || won) && hasBomb;
  const { neighbourBombs } = field;

  return (
    <div
      className={`field${isVisible ? ' field-visible' : ''}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {displayBomb
        ? <img src={bombImg} width='30px' height='30px' />
        : flagged
          ? <img src={flagImg} width='30px' height='30px' />
          : null}
      {isVisible && neighbourBombs > 0 && neighbourBombs}
    </div>
  );
}

export default Field;