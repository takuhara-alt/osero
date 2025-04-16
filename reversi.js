const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SIZE = 6;
const EMPTY = "□";
const BLACK = "●";
const WHITE = "○";
let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));

// 初期配置
board[2][2] = WHITE;
board[2][3] = BLACK;
board[3][2] = BLACK;
board[3][3] = WHITE;

let currentPlayer = BLACK;

function printBoard() {
  console.log("　 A B C D E F");
  for (let i = 0; i < SIZE; i++) {
    const row = board[i].join("");
    console.log(`${i + 1} ${row}`);
  }
}

function countStones() {
  let black = 0, white = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell === BLACK) black++;
      if (cell === WHITE) white++;
    }
  }
  return { black, white };
}

function promptInput() {
  printBoard();
  rl.question(`${currentPlayer}＞`, (input) => {
    if (input.trim() === "") {
      const { black, white } = countStones();
      const winner =
        black > white ? "●の勝ち！" : white > black ? "○の勝ち！" : "引き分け！";
      console.log(winner);
      rl.close();
      return;
    }

    const match = input.match(/^([A-Fa-f])([1-6])$/);
    if (!match) {
      console.log("正しい形式で入力してください（例：A3）");
      return promptInput();
    }

    const col = match[1].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(match[2], 10) - 1;

    if (board[row][col] !== EMPTY) {
      console.log("すでに石があります！");
      return promptInput();
    }

    board[row][col] = currentPlayer;
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    promptInput();
  });
}

promptInput();
