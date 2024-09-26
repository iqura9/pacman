import { useRef, useState } from 'react';
import { Move } from '../components/Play';

export function useGameBoard() {
  const [direction, setDirection] = useState<Move>(null);
  const inputDiv = useRef<HTMLInputElement | null>(null);

  const mouseEnter = () => {
    inputDiv.current?.focus();
  };

  const mouseLeave = () => {
    inputDiv.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newDirection: Move = null;

    switch (e.key) {
      case 'ArrowUp':
        newDirection = 'UP';
        break;
      case 'ArrowDown':
        newDirection = 'DOWN';
        break;
      case 'ArrowLeft':
        newDirection = 'LEFT';
        break;
      case 'ArrowRight':
        newDirection = 'RIGHT';
        break;
      default:
        break;
    }

    if (newDirection && newDirection !== direction) {
      setDirection(newDirection);
    }
  };
  return {
    inputDiv,
    direction,
    setDirection,
    mouseEnter,
    mouseLeave,
    handleKeyDown,
  };
}
