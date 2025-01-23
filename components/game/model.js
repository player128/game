import { MOVE_ORDER } from "./constants";

export function getNextMove(currentMove, playersCount) {
  const slicedMoverOrder = MOVE_ORDER.slice(0, playersCount);
  const nextMoveIndex = slicedMoverOrder.indexOf(currentMove) + 1;
  return slicedMoverOrder[nextMoveIndex] ?? slicedMoverOrder[0];
}

export function computeWinner(cells, sequenceSize = 5, fieldsize = 19) {
    const gap = Math.floor(sequenceSize / 2);
  
    function compareElements (indexes) {
      let result = true;
  
      for (let i = 1; i < indexes.length; i++) {
        result &&= !!cells[indexes[i]];
        result &&= cells[indexes[i]] === cells[indexes[i - 1]];
      }
      return result;
    }
  
    function getSequenceIndexes(i) {
      const res = [
        [], // -
        [], // \
        [], // /
        [] // |
      ];
  
      for (let j = 0; j < sequenceSize; j++) {
        res[0].push(j - gap + i);
        res[1].push(fieldsize * (j - gap) + (j - gap) + i);
        res[2].push(-fieldsize * (j - gap) + (j - gap) + i);
        res[3].push(fieldsize * (j - gap) + i);
      }

      const x = i % fieldsize;
      if (x < gap || x >= fieldsize -gap ) {
        res.shift();
        res.shift();
        res.shift();
      }
  
      return res;
    }
  
    for (let i = 0; i < cells.length; i++) {
      if (cells[i]) {
        const indexRows = getSequenceIndexes(i);
  
        const winnerIndexes = indexRows.find(rows => compareElements(rows));
  
        if (winnerIndexes) {
          return winnerIndexes;
        }
      }
    }
  
    return undefined;
}