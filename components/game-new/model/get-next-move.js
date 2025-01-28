import { MOVE_ORDER } from "../constants";


export function getNextMove(gameState) {
  const slicedMoverOrder = MOVE_ORDER.slice(0, gameState.playersCount);
  const nextMoveIndex = slicedMoverOrder.indexOf(gameState.currentMove) + 1;
  return slicedMoverOrder[nextMoveIndex] ?? slicedMoverOrder[0];
}
