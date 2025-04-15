let dark = false;

function toggleDarkMode() {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
}

function solveNQueens(n) {
  let board = Array(n).fill().map(() => Array(n).fill('.'));
  let solutions = [];

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;
    return true;
  }

  function solve(row = 0) {
    if (row === n) {
      solutions.push(board.map(r => [...r]));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        solve(row + 1);
        board[row][col] = '.';
      }
    }
  }

  solve();
  return solutions;
}

function solve() {
  const n = parseInt(document.getElementById("nInput").value);
  const results = solveNQueens(n);
  const output = document.getElementById("output");
  output.innerHTML = '';

  results.forEach((solution, idx) => {
    const container = document.createElement('div');
    container.className = 'board-container';

    const board = document.createElement('div');
    board.className = 'board';
    board.style.gridTemplateColumns = `repeat(${n}, 40px)`; // Fixed template literal

    solution.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const div = document.createElement('div');
        div.className = 'cell ' + ((rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark');
        if (cell === 'Q') {
          div.classList.add('queen');
          div.innerHTML = '&#9819;';
        }
        board.appendChild(div);
      });
    });

    const explanation = document.createElement('p');
    explanation.innerHTML = `<strong>Queen Positions:</strong><br>` + 
      solution.map((row, i) => `Row ${i + 1}: Column ${row.indexOf('Q') + 1}`).join('<br>');

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Image';
    downloadBtn.onclick = () => downloadBoardImage(container, `solution-${idx + 1}`);

    container.appendChild(board);
    container.appendChild(explanation);
    container.appendChild(downloadBtn);
    output.appendChild(container);
  });
}

function startAnimation() {
  const n = parseInt(document.getElementById("nInput").value);
  const output = document.getElementById("output");
  output.innerHTML = '';
  let board = Array(n).fill().map(() => Array(n).fill('.'));

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;
    return true;
  }

  const container = document.createElement('div');
  container.className = 'board-container';
  const boardDiv = document.createElement('div');
  boardDiv.className = 'board';
  boardDiv.style.gridTemplateColumns = `repeat(${n}, 40px)`; // Fixed template literal
  container.appendChild(boardDiv);
  output.appendChild(container);

  function renderBoard() {
    boardDiv.innerHTML = '';
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const div = document.createElement('div');
        div.className = 'cell ' + ((i + j) % 2 === 0 ? 'light' : 'dark');
        if (cell === 'Q') div.innerHTML = '&#9819;';
        boardDiv.appendChild(div);
      });
    });
  }

  let delay = 300;
  function animate(row = 0) {
    if (row === n) return;
    for (let col = 0; col < n; col++) {
      setTimeout(() => {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          renderBoard();
          animate(row + 1);
        }
      }, delay * (row * n + col));
    }
  }
  animate();
}

function downloadBoardImage(container, name) {
  html2canvas(container).then(canvas => {
    const link = document.createElement('a');
    link.download = `${name}.png`; // Fixed template literal
    link.href = canvas.toDataURL();
    link.click();
  });
}