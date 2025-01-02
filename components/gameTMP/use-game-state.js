import { SYMBOL_X, SYMBOL_O } from "./constants";
import { useState } from "react";

const victory = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
};

export function useGameState() {
  const [currentStep, setCurrentStep] = useState(SYMBOL_O);
  const [cells, setCells] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [winnerSequence, setWinnerSequence] = useState(null);

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;

  const handleCellClick = (index) => {
    // console.log("click " + index);
    if (cells[index] || winnerSequence) return;
    const cellsCopy = cells.slice();
    cellsCopy[index] = currentStep;
    const winner = victory(cellsCopy);

    setCells(cellsCopy);
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner);
  };

  const clearGame = () => {
    setCurrentStep(SYMBOL_O);
    setCells([null, null, null, null, null, null, null, null, null]);
    setWinnerSequence(null);
  };

  return {
    cells,
    currentStep,
    winnerSequence,
    handleCellClick,
    clearGame,
    winnerSymbol,
  };
}
