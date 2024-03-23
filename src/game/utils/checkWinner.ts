export const checkWinner = (grid: Array<Array<string>>) => {
  const directions = [
    { x: 0, y: 1 }, // vertical
    { x: 1, y: 0 }, // horizontal
    { x: 1, y: 1 }, // diagonal
    { x: 1, y: -1 } // anti-diagonal
  ];

  const NB_ROWS = 6;
  const NB_COLUMNS = 7;

  for (let y = 0; y < NB_ROWS; y++) {
    for (let x = 0; x < NB_COLUMNS; x++) {
      const player = grid[y][x];
      if (!player) continue;

      for (const direction of directions) {
        let count = 0;
        let dx = x;
        let dy = y;

        while (count < 4) {
          if (grid[dy]?.[dx] !== player) break;
          dx += direction.x;
          dy += direction.y;
          count++;
        }

        if (count === 4) return player;
      }
    }
  }

  return null;
}