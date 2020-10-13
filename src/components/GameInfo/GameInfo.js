import React from 'react';
import GameContext from '../../GameContext';
import Timer from '../Timer/Timer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: ${({ width }) => 42 * width}px;
`;

const GameInfo = () => {
  const { bombCount, fields, boardDimensions } = React.useContext(GameContext);
  
  const { width } = boardDimensions;

  const flaggedCount = fields
    .filter(f => f.flagged)
    .reduce((acc) => acc + 1, 0);

  return (
    <Container width={width}>
      <h2>Pozostało min: {bombCount - flaggedCount}</h2>
      <Timer />
    </Container>
  );
}

export default GameInfo;