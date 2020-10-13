import React from 'react';
import GameContext from '../../GameContext';
import './Timer.css';

const Timer = () => {
  const { gameOver, won } = React.useContext(GameContext);
  const interval = React.useRef();
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (interval.current)
      clearInterval(interval.current);

    interval.current = setInterval(() => {
      setSeconds(v => v + 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  React.useEffect(() => {
    if (gameOver || won)
      clearInterval(interval.current);
  }, [gameOver, won]);

  return <h2 className='timer'>Czas: {seconds} sekund</h2>;
}

export default Timer;