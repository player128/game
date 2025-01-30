import clsx from "clsx";
import { GameSymbol } from "./game-symbol";
import { memo } from "react";

export const GameCell = memo(function GameCell({ onClick, isWinner, disabled, symbol, index}) {
    console.log('render cell');
    return (
        <button
            disabled={disabled}
            className={clsx(
            "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
            isWinner && "bg-orange-600/10",
            )}
            onClick={() => onClick(index)}
        >
            {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
        </button>
    );
})
