// Global Variables

// Conceptual board that holds the information for the board placements
// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let playerXWins = 0;
let playerOWins = 0;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';
let won = false;

const buildBoard = (board) => {
  /// //why is board container innerhtml done here and not in initGame?
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');
  const playerWins = document.createElement('Div');
  playerWins.classList.add('playerWins');
  playerWins.innerText = `Player X has ${playerXWins} wins \n Player O has ${playerOWins} wins`;

  // running for loop for number of rows aka board[i]
  for (let i = 0; i < board.length; i += 1) {
    // taking that row and getting the key and values in that row
    const row = board[i];
    // creating a HTML element for this specific row
    const rowElement = document.createElement('div');
    // giving class to this row and all upcoming row
    rowElement.classList.add('row');
    // running for loop for each value in the row above
    for (let j = 0; j < row.length; j += 1) {
      // creating an individual square
      const square = document.createElement('div');
      // giving it a class of square
      square.classList.add('square');
      // getting the value of that specific place through board[i][j] and
      // putting it inside that aquare inside the html
      square.innerText = board[i][j];
      // placing the square into the rows above
      rowElement.appendChild(square);

      // adds an event listener to each square that makes it so that every time a
      // square is clicked, squareClick element runs which in turn builds a
      // new board based on the change in board array
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }
    // adding a single row to the boardElement in the html
    boardElement.appendChild(rowElement);
    // adding the board into the div of board
    boardContainer.appendChild(boardElement);
    boardContainer.appendChild(playerWins);
  }
};

// creates the board container element and puts it on the html
const initGame = () => {
  // creating boardContainer which houses the board=>row=>square=>squareClick=>
  // togglePlayer
  boardContainer = document.createElement('div');
  boardContainer.classList.add('boardContainer');
  document.body.appendChild(boardContainer);

  // builds the board which houses the => squareClick function which houses =>
  // togglePlayer function so only this function is enough to run the game
  buildBoard(board);
};

const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // check if this coordinate is empty on the board right now
  if (board[column][row] === '') {
    // if the board array at this index is empty push the value for current player into this index
    board[column][row] = currentPlayer;
    checkWin();
    console.log('Jesus');
    if (won === true) {
      console.log(`Player ${currentPlayer} Won!`);
      winThings();
    } else togglePlayer();

    // refresh the screen with a new board built based on the board right now
    buildBoard(board);
  }
  // change the value of current Player to o or x based on whos turn it is
  // toggle player changes to player o or x based on whoevers turn it is now
};

const checkWin = () => {
  if ((board[0][0] === board[0][1] && board[0][1] === board[0][2] && (board[0][2] === 'X' || board[0][2] === 'O'))
  || (board[1][0] === board[1][1] && board[1][1] === board[1][2] && (board[1][2] === 'X' || board[1][2] === 'O'))
  || (board[2][0] === board[2][1] && board[2][1] === board[2][2] && (board[2][2] === 'X' || board[2][2] === 'O'))
  || (board[0][0] === board[1][1] && board[1][1] === board[2][2] && (board[2][2] === 'X' || board[2][2] === 'O'))
  || (board[0][2] === board[1][1] && board[1][1] === board[2][0] && (board[2][0] === 'X' || board[2][0] === 'O'))
  || (board[0][0] === board[1][0] && board[1][0] === board[2][0] && (board[2][0] === 'X' || board[2][0] === 'O'))
  || (board[0][1] === board[1][1] && board[1][1] === board[2][1] && (board[2][1] === 'X' || board[2][1] === 'O'))
  || (board[0][2] === board[1][2] && board[1][2] === board[2][2] && (board[2][2] === 'X' || board[2][2] === 'O'))
  ) {
    won = true;
  } else won = false;
};

// function for when somoene wins
const winThings = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  if (currentPlayer === 'X') {
    playerXWins += 1;
  } else if (currentPlayer === 'O') {
    playerOWins += 1;
  }
  currentPlayer = 'X';
  won = false;
};

initGame();
