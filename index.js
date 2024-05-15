var cube = document.querySelectorAll(".cube");
var winTitle = document.querySelector(".win");
var restart = document.querySelector(".restart");
var cAI = {
  ai1: document.querySelectorAll(".smartAI"),
  ai2: document.querySelectorAll(".foolAI")
}

var score = {
  scoreX: document.querySelector(".X"),
  scoreO: document.querySelector(".O")
}
let property = {
  cubeVal: ["","","","","","","","",""],
  turn: 0,
  allowClick: true,
  scoreX: 0,
  scoreO: 0,
  X: 100,
  O: -100,
  T: 0,
  isAI: false
}

let functions = {
  init: function(){
    functions.cubeClick();
    functions.chooseAI();
    setInterval(() => functions.winHandle(functions.winStatement(property.cubeVal)), 100);
    score.scoreX.textContent = property.scoreX;
    score.scoreO.textContent = property.scoreO;
  },
  cubeClick: function(){
    cube.forEach(e => {
      e.addEventListener("click", function(f){
        if(f.target.textContent !== "") return;
        if(!property.allowClick) return;
        if(property.turn == 0){
          f.target.textContent = "X";
          property.cubeVal[f.target.id] = "X";
          property.turn = 1;
          property.allowClick = false;
        }
        //console.log(functions.movePossibilityAI(property.cubeVal, 3));
        if(property.isAI) functions.bestMove(property.cubeVal);
        else functions.foolAI();
        //functions.foolAI();
      });
    });
  },
  winStatement: function(board){
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
    
    if(property.cubeVal.indexOf("") === -1){
      return "T";
    }
    
     return null;
  },
  winHandle: function(cond){
    switch(cond){
      case "O":
        winTitle.textContent = "Player O win!";
        winTitle.style.color = "#0000ff";
        property.cubeVal = ["","","","","","","","",""];
        restart.style.display = "inline-block";
        property.scoreO++;
        score.scoreO.textContent = property.scoreO;
        property.allowClick = false;
        functions.restart();
        break;
      case "X":
        winTitle.textContent = "Player X win!";
        winTitle.style.color = "#ff0000";
        property.cubeVal = ["","","","","","","","",""];
        property.scoreX++;
        score.scoreX.textContent = property.scoreX;
        restart.style.display = "inline-block";
        property.allowClick = false;
        functions.restart();
        break;
      case "T":
        winTitle.textContent = "Tie!";
        winTitle.style.color = "#00ff00";
        property.cubeVal = ["","","","","","","","",""];
        restart.style.display = "inline-block";
        property.allowClick = false;
        functions.restart();
        break;
      default:
        break;
    }
  },
  foolAI: function(){
     let rand = Math.round(Math.random() * 9);
     if(property.cubeVal[rand] !== ""){
         let func = (depth) => {
           rand = Math.round(Math.random() * 9);
           
           if(depth <= 0 || property.cubeVal[rand] === ""){
             return;
           }
           
           if(property.cubeVal[rand] !== ""){ func(depth - 1); }
           else{ return; }
          
         }
         func(50);
       }
      property.cubeVal[rand] = "O";
     for(i = 0; i < cube.length; i++){
       if(cube[i].textContent === ""){
          if(parseInt(cube[i].id) === rand) cube[i].textContent = "O";
       }
     }
     property.allowClick = true;
     property.turn = 0;
   },
   smartAI: function(board, depth, ai, alpha, beta){
     let whoWin = functions.winStatement(board);
     
     //if(depth === 4 && whoWin === "O") console.log({whoWin});
     
     if(whoWin !== null){
       return property[whoWin];
     }
     
     if(ai){
       let bestScore = -Infinity;
       for(let i = 0; i < 9; i++){
         if(board[i] === ""){
           board[i] = "X";
           let score = functions.smartAI(board, depth - 1, false);
           board[i] = "";
           bestScore = (Math.max(score, bestScore) - depth);
           alpha = Math.max(alpha, bestScore);
           if(beta <= alpha) break;
         }
       }
      //if(depth === 0) console.log(bestScore);
      return bestScore;
     }else {
       let bestScore = Infinity;
       for(let i = 0; i < 9; i++){
         if(board[i] === ""){
           board[i] = "O";
           let score = functions.smartAI(board, depth - 1, true);
           board[i] = "";
           bestScore = (Math.min(score, bestScore) + depth);
           beta = Math.min(beta, bestScore);
           if(beta <= alpha) break;
         }
       }
      //if(depth === 1) console.log(bestScore);
      return bestScore;
     }
     
   },
   bestMove: function(board){
     let bestScore = Infinity;
     let move;
     let score;
     for(let i = 0; i < 9; i++){
       if(board[i] === ""){
         board[i] = "O";
         score = functions.smartAI(board, 9, true, -Infinity, Infinity);
         board[i] = "";
         if(score < bestScore){
           bestScore = score;
           move = i;
         }
       }
     }
     if(move !== undefined){
     board[move] = "O";
     cube[move].innerText = "O";
     }
     property.allowClick = true;
     property.turn = 0;
   },
   restart: function(){
     restart.addEventListener("click", function(e){
        cube.forEach(e => {
          e.textContent = "";
        });
        restart.style.display = "none";
        winTitle.textContent = "";
        property.allowClick = true;
     });
   },
   chooseAI: function(){
     cAI.ai1.forEach((act, i) => {
       act.addEventListener("click", function(e){
          property.cubeVal = ["","","","","","","","",""];
          cube.forEach(e => {
            e.textContent = "";
          });
          property.scoreX = 0;
          property.scoreO = 0;
          score.scoreX.textContent = property.scoreX;
          score.scoreO.textContent = property.scoreO;
          property.isAI = true;
          winTitle.textContent = "";
          property.allowClick = true;
          e.target.style.backgroundColor = "green";
          cAI.ai2[i].style.backgroundColor = "#0d6efd";
       });
     });
     
     cAI.ai2.forEach((act, i) => {
       act.addEventListener("click", function(e){
         property.cubeVal = ["","","","","","","","",""];
         cube.forEach(e => {
            e.textContent = "";
         });
         property.scoreX = 0;
         property.scoreO = 0;
         score.scoreX.textContent = property.scoreX;
         score.scoreO.textContent = property.scoreO;
         property.isAI = false;
         winTitle.textContent = "";
         property.allowClick = true;
         e.target.style.backgroundColor = "green";
         console.log(cAI.ai1[i].style.backgroundColor);
         cAI.ai1[i].style.backgroundColor = "#0d6efd";
       });
     });
   }
   
}

functions.init();