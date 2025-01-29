import { MOVE_ORDER } from "../constants";


export function getNextMove({currentMove, playersCount , timers}) {
  const slicedMoverOrder = MOVE_ORDER.slice(0, playersCount).filter(symbol => timers[symbol] > 0);
  const nextMoveIndex = slicedMoverOrder.indexOf(currentMove) + 1;
  return slicedMoverOrder[nextMoveIndex] ?? slicedMoverOrder[0];
}
