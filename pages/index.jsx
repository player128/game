import { useState } from "react";
import { GameTitle, GameInfo, GameField, useGameState } from "../components/game";
import { Header } from "../components/header";
import { GameSymbol } from "../components/game/game-symbol";

export default function HomePage() {
  const [playersCount] = useState(4);
  const { 
    cells, 
    currentMove, 
    nextMove, 
    handleCellClick, 
    winnerSequence, 
    handlePlayerTimeOver,
    winnerSymbol 
  } = useGameState(playersCount);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="pt-6 mx-auto w-max">
        <GameTitle playersCount={playersCount}/>
        <GameInfo playersCount={playersCount} 
          className="mt-4"
          currentMove={currentMove}
          isWinner={!!winnerSymbol}
          onPlayerTimerOver={handlePlayerTimeOver}
        />
        {winnerSymbol && (
          <div className="my-4">
            <GameSymbol symbol = {winnerSymbol}/>
          </div>
        )}

        <GameField 
          className="mt-6" 
          cells={cells}
          currentMove={currentMove}
          nextMove={nextMove}
          handleCellClick={handleCellClick}
          winnerSequence={winnerSequence}
          winnerSymbol={winnerSymbol}
        />
      </main>
    </div>
  );
}
