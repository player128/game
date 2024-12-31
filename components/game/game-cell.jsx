import { GameSymbol } from "./game-symbol";
import { clsx } from "clsx";

export function GameCell({ isWinner, handleCellClick, symbol, index }) {
  return (
    <button
      className={clsx(
        "border border-gray-400 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-red-400",
      )}
      onClick={() => handleCellClick(index)}
    >
      {symbol ? <GameSymbol symbol={symbol} /> : null}
    </button>
  );
}
