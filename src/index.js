import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game/Game';

ReactDOM.render(
  <Game width={10} height={10} bombCount={12} />,
  document.querySelector('#root')
);