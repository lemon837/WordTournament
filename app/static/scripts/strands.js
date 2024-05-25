const letters = [
  'T', 'E', 'P', 'H', 'L', 'A',
  'E', 'M', 'A', 'O', 'I', 'C',
  'R', 'I', 'O', 'M', 'R', 'H',
  'K', 'L', 'P', 'E', 'S', 'I',
  'S', 'A', 'E', 'H', 'L', 'S',
  'E', 'O', 'N', 'O', 'L', 'T',
  'I', 'T', 'O', 'E', 'Y', 'A',
  'M', 'E', 'M', 'S', 'E', 'K'
];

const answers = ['MEET', 'PAIR', 'SERIAL', 'LEAK', 'MOOSE', 'TIME', 'CHILLY', 'STEAK']
const spangram = 'HOMOPHONES'

const svg = document.getElementById('lines');

const grid = document.getElementById('grid');
const wordsList = document.getElementById('words-list');
const wordInput = document.getElementById('word-input');
let selectedLetters = '';
let selectedCells = [];

function createGrid() {
  letters.forEach(letter => {
      const cell = document.createElement('div');
      cell.textContent = letter;
      cell.addEventListener('click', () => selectCell(cell));
      grid.appendChild(cell);
  });
}

function selectCell(cell) {
  if (!selectedCells.includes(cell)) {
    const letter = cell.textContent
    selectedLetters += letter;
    wordInput.innerHTML = selectedLetters;

    selectedCells.push(cell)
    cell.classList.add('selected');
    drawLine();
  }
}

function drawLine() {
  if (selectedCells.length > 1) {
      const prevCell = selectedCells[selectedCells.length - 2];
      const currentCell = selectedCells[selectedCells.length - 1];
      const prevRect = prevCell.getBoundingClientRect();
      const currentRect = currentCell.getBoundingClientRect();
      const containerRect = grid.getBoundingClientRect();

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', prevRect.left + prevRect.width / 2 - containerRect.left);
      line.setAttribute('y1', prevRect.top + prevRect.height / 2 - containerRect.top);
      line.setAttribute('x2', currentRect.left + currentRect.width / 2 - containerRect.left);
      line.setAttribute('y2', currentRect.top + currentRect.height / 2 - containerRect.top);
      line.setAttribute('stroke', 'black');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
  }
}

function submitWord() {
  const word = wordInput.innerHTML.trim();
  if (word) {
      // Initialise variables
      const wordElement = document.createElement('div');
      wordElement.textContent = word;
      wordsList.appendChild(wordElement);

      // Check if the word was correct
      if (answers.indexOf(word) != -1) {
        console.log('Correct!')
        selectedCells.forEach(cell => {
          cell.classList.add('correct');
        });
      }
      else {
        console.log('Incorrect!')
        selectedCells.forEach(cell => {
          cell.classList.remove('selected');
        });
      }

      // Reset variables
      wordInput.value = '';
      selectedLetters = '';
      wordInput.innerHTML = '';
      selectedCells = [];
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
  }
}

function clearWord() {
  wordInput.innerHTML = '';
  wordInput.value = '';
  selectedLetters = '';
  selectedCells.forEach(cell => {
    cell.style.background = 'White';
  });
  selectedCells = [];
}

function onBodyClick(event) {
  if (event.target === document.body) {
      alert('You clicked on the blank space of the body!');
  }
}

document.body.addEventListener('click', onBodyClick);

createGrid();
