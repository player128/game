import clsx from "clsx";
import { Profile } from "../profile/profile";
import { CrossIcon } from "./icons/cross-icon";
import { ZeroIcon } from "./icons/zero-icon";
import { GameSymbol } from "./game-symbol";
import { GAME_SYMBOLS } from "./constants";
import avatarSrc1 from './images/avatar-1.png';
import avatarSrc2 from './images/avatar-2.png';
import avatarSrc3 from './images/avatar-3.png';
import avatarSrc4 from './images/avatar-4.png';
import { useEffect, useState } from "react";

const players = [
  {
    id : 1,
    name:'Paromovevg', 
    rating: 1230, 
    avatar: avatarSrc1, 
    symbol:GAME_SYMBOLS.CROSS 
  },
  {
    id : 2,
    name:'VereIntedinglapotur', 
    rating: 850, 
    avatar: avatarSrc2, 
    symbol:GAME_SYMBOLS.ZERO 
  },
  {
    id : 3,
    name:'Lara', 
    rating: 1370, 
    avatar: avatarSrc3, 
    symbol:GAME_SYMBOLS.TRINGLE 
  },
  {
    id : 4,
    name:'Додик', 
    rating: 760, 
    avatar: avatarSrc4, 
    symbol:GAME_SYMBOLS.SQUARE 
  },
];

export function GameInfo({ className, playersCount , currentMove, isWinner, onPlayerTimerOver}) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 justify-between grid grid-cols-2 gap-3",
      )}
    >
      {players.slice(0, playersCount).map((player, index) => 
        <PlayInfo key={player.id} 
        playerInfo={player} 
        isRight={index % 2 === 1}
        onTimeOver={() => onPlayerTimerOver(player.symbol)}
        isTimerRunning={currentMove === player.symbol && !isWinner}
      />)}
    </div>
  );
}

function PlayInfo({ playerInfo, isRight, isTimerRunning, onTimeOver }) {
  const [seconds, setSeconds] = useState(10);

  const minuteString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => { 
        setSeconds(s => Math.max(0, s - 1));
      }, 1000);

      return () => {
        clearInterval(interval);
        setSeconds(15);
      }
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (seconds === 0) {
      onTimeOver();
    }
  }, [seconds]);

  const getTimerColor = () => {
    if (isTimerRunning) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }
    return "text-slate-200";
  };

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && 'order-3')}>
        <Profile 
          className="w-44" 
          name={playerInfo.name}
          rating={playerInfo.rating}
          avatar={playerInfo.avatar}
        />
        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol}/>
        </div>
      </div>
      <div className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")}></div>
      <div className={clsx(
        "text-lg font-semibold w-[60px]", 
        isRight && "order-1",
        getTimerColor()
      )}>
        {minuteString}:{secondString}
      </div>
    </div>
  );
}