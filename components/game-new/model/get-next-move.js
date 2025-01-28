import { MOVE_ORDER } from "../constants";


export function getNextMove(currentMove, playersCount, playersTimeOver) {
  const slicedMoverOrder = MOVE_ORDER.slice(0, playersCount).filter(
    (symbol) => !playersTimeOver.includes(symbol)
  );
  const nextMoveIndex = slicedMoverOrder.indexOf(currentMove) + 1;
  return slicedMoverOrder[nextMoveIndex] ?? slicedMoverOrder[0];
}
