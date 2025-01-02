import styles from "../../styles/game.module.css";
import { GameCell } from "./game-cell";
import { GameInfo } from "./game-info";
import { useGameState } from "./use-game-state";
import { ResetButton } from "../reset-button";

export function Game() {
  console.log("render");
  const {
    cells,
    currentStep,
    winnerSequence,
    handleCellClick,
    clearGame,
    winnerSymbol,
  } = useGameState();

  return (
    <div className="flex flex-col items-center w-40 mx-auto my-24 p-5 border border-black">
      <GameInfo
        isDraw={cells.join("").length === 9 && !winnerSequence}
        currentStep={currentStep}
        winnerSymbol={winnerSymbol}
      />
      <div className="grid pt-px pl-px grid-cols-[repeat(3,_30px)] grid-rows-[repeat(3,_30px)]">
        {cells.map((symbol, index) => (
          <GameCell
            key={index}
            isWinner={winnerSequence?.includes(index)}
            handleCellClick={handleCellClick}
            symbol={symbol}
            index={index}
          />
        ))}
      </div>
      <ResetButton onClick={clearGame} />
    </div>
  );
}
