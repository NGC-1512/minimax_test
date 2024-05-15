
function evaluate(board){
    var winBoard = [[], [], []];
    var slicing = [0, 3];
    
    
    for(let i = 0; i < winBoard.length; i++){
      winBoard[i] = board.slice(slicing[0], slicing[1]);
      slicing[0] += 3;
      slicing[1] += 3;
    }
    
    for(let i = 0; i < winBoard.length; i++){
      if(winBoard[i][0] !== "" && winBoard[i][0] === winBoard[i][1] && winBoard[i][1] === winBoard[i][2]){
           return winBoard[i][0];
       }
    }
    
    for(let i = 0; i < winBoard[0].length; i++){
      if(winBoard[0][i] !== "" && winBoard[0][i] === winBoard[1][i] && winBoard[1][i] === winBoard[2][i]){
          return winBoard[0][i];
      }
    }
    
    if(winBoard[0][0] !== "" && winBoard[0][0] === winBoard[1][1] && winBoard[1][1] === winBoard[2][2]){
          return winBoard[0][0];
    }else if(winBoard[0][2] !== "" && winBoard[0][2] === winBoard[1][1] && winBoard[1][1] === winBoard[2][0]){
          return winBoard[0][2];
    }
    
    if(board.indexOf("") === -1){
      return "T";
    }
  }
  
let Hscore = {
  X: 100,
  O: -100,
  T: 0
}

function minimax(board, depth, isMaximizingPlayer) {
    let score = evaluate(board);

    // Base case: jika permainan berakhir atau sudah mencapai kedalaman maksimum
    if (score !== undefined) {
        return Hscore[score];
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
      //  if(depth === 7) console.log("test");
        return bestScore;
    }
}

function findBestMove(board, depth) {
    let bestMove;
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            let score = minimax(board, depth + 1, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

// Contoh penggunaan:
let board = [
    'X', 'X', 'O',
    'O', 'O', 'X',
    'X', 'O', ''
];

let bestMove = findBestMove(board, 0);
console.log("Best Move: " + bestMove);