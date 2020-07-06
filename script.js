let board;
const huPlayer ='O'
const aiPlayer ='X' 
let winCombos=[
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let result =document.getElementById('result')
const cells =document.querySelectorAll('.cell')
startGame()

function startGame() {
    result.innerHTML="You are O";
    board =[0,1,2,3,4,5,6,7,8]
    for(let i=0;i<cells.length;i++) {
        cells[i].innerHTML="";
        cells[i].addEventListener('click',turnClick,false);
    }
}

function emptySquares() {
    return board.filter(square=> typeof square == 'number')
}

function turnClick(square) {
    if(typeof board[square.target.id] == 'number') {
        turn(square.target.id,huPlayer)
        
        if(emptySquares().length != 0 )
            turn(minimax(board,aiPlayer).index,aiPlayer)
        else
            displayDraw()
    }
}

function displayDraw() {
    if(result.innerHTML === 'You are O')
    result.innerHTML ='its a Draw !'
}

function turn(squareID,player) {
    board[squareID] = player;
    document.getElementById(squareID).innerHTML=player;
    let gameWon = checkForWin(board,player)
    if(gameWon) gameOver(player)
}

function checkForWin(board,player) {
    let plays =board.reduce((a,e,i)=>
        (e === player) ?a.concat(i):a,[]
    )
    let gameWon = false;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = true;
			break;
		}
	}
	return gameWon;

}
function gameOver(player) {
    result.innerHTML = 'Player '+player +" won !"
    for(let i=0;i<cells.length;i++) {
        cells[i].removeEventListener('click',turnClick,false)
    }
}



function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkForWin(newBoard, huPlayer)) {
		return { score: -10 };
	} else if (checkForWin(newBoard, aiPlayer)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}