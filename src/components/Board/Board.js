import React from 'react';
import Field from '../Field/Field';
import styled from 'styled-components';
import GameContext from '../../GameContext';

const BoardDiv = styled.div`
  width: ${({ width }) => 42 * width}px;
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
`;

const Board = () => {
  const { fields, boardDimensions } = React.useContext(GameContext);
  const { width } = boardDimensions;

  return (
    <BoardDiv width={width}>
      {fields.map(({ x, y }, i) => (
        <Field x={x} y={y} key={i} />
      ))}
    </BoardDiv>
  );
}

export default Board;