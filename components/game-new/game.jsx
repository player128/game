import { PLAYERS } from "./constants";
import { BackLink } from "./ui/back-link";
import { GameCell } from "./ui/game-cell";
import { GameInfo } from "./ui/game-info";
import { GameLayout } from "./ui/game-layout";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { GameOverModal } from "./ui/game-over-modal";
import { GAME_STATE_ACTIONS, gameStateReducer, initGameState } from "./model/game-state-reducer";
import { useEffect, useReducer } from "react";
import { computeWinner } from "./model/compute-winner";
import { getNextMove } from "./model/get-next-move";
import { computeWinnerSymbol } from "./model/compute-winner-symbol";
import { computePlayerTimer } from "./model/compute-player-timer";
import { useInteral } from "../lib/timers";

const PLAYERS_COUNT = 2;

export function Game() {
    const [gameState, dispatch] = useReducer(
        gameStateReducer, 
        {playersCount : PLAYERS_COUNT, defaultTimer : 10000, currentMoveStart : Date.now()
     }, initGameState);

    useInteral(1000, gameState.currentMoveStart, () => {
        dispatch({
            type : GAME_STATE_ACTIONS.TICK,
            now : Date.now(), 
        });    
    });

    const winnerSequence = computeWinner(gameState);
    const nextMove = getNextMove(gameState);
    const winnerSymbol = computeWinnerSymbol(gameState, {winnerSequence, nextMove});

    const winnerPlayer = PLAYERS.find(player => player.symbol === winnerSymbol);

    return (
        <>
            <GameLayout 
                backLink={<BackLink />}
                title={<GameTitle />}
                gameInfo={<GameInfo 
                    isRatingGame
                    playersCount={4}
                    timeMode={'1 мин. на ход'}
                />}
                playerList={
                    PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
                        const { timer, timerStartAt } = computePlayerTimer(gameState, player.symbol);
                        return (<PlayerInfo
                            key={player.id}
                            avatar={player.avatar}
                            name={player.name}
                            rating={player.rating}
                            symbol={player.symbol}
                            isRight={index % 2 === 1}
                            timer={timer}
                            timerStartAt={timerStartAt}
                        />)
                    })
                }
                gameMoveInfo={<GameMoveInfo
                    currentMove={gameState.currentMove}
                    nextMove={nextMove}
                />}
                gameCells={gameState.cells.map((cell, index) => <GameCell
                    key={index}
                    disabled={!!winnerSymbol}
                    onClick={() => {
                        dispatch({
                            type : GAME_STATE_ACTIONS.CELL_CLICK,
                            index,
                            now : Date.now(),
                        });
                    }}
                    isWinner={winnerSequence?.includes(index)}
                    symbol={cell}
                />)}
            />
            <GameOverModal 
                winnerName={winnerPlayer?.name} 
                players={
                    PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => <PlayerInfo
                        key={player.id}
                        avatar={player.avatar}
                        name={player.name}
                        rating={player.rating}
                        timer={gameState.timers[player.symbol]}
                        symbol={player.symbol}
                        isRight={index % 2 === 1}
                    />)
                }
            />
        </>
    );
}