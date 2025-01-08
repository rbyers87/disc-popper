const startButton = document.getElementById('start-button');
    const countdownDisplay = document.getElementById('countdown');
    const discContainer = document.getElementById('disc-container');
    const scoreDisplay = document.getElementById('score');
    const roundDisplay = document.getElementById('round');
    const instructionDisplay = document.getElementById('instruction');
    const gameOverDisplay = document.getElementById('game-over');
    
    let score = 0;
    let round = 1;
    let isGameOver = true;
    let gameStarted = false;
    let targetColor = '';
    let discColors = ['red', 'blue', 'green', 'yellow'];
    
    function createDisc() {
      const disc = document.createElement('div');
      disc.classList.add('disc');
      const color = discColors[Math.floor(Math.random() * discColors.length)];
      disc.style.backgroundColor = color;
      disc.style.left = Math.random() * 360 + 'px';
      disc.style.top = Math.random() * 560 + 'px';
      disc.addEventListener('click', () => handleDiscClick(disc, color));
      discContainer.appendChild(disc);
      return disc;
    }
    
    function handleDiscClick(disc, color) {
      if (isGameOver || !gameStarted) return;
      if (round >= 10 && color !== targetColor) {
        score--;
      } else {
        score++;
      }
      scoreDisplay.textContent = 'Score: ' + score;
      disc.remove();
    }
    
    function clearDiscs() {
      while (discContainer.firstChild) {
        discContainer.removeChild(discContainer.firstChild);
      }
    }
    
    function update() {
      if (isGameOver || !gameStarted) return;
    
      const numDiscs = Math.min(round + 2, 10);
      for (let i = 0; i < numDiscs; i++) {
        createDisc();
      }
    
      let timeLeft = 3;
      const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          clearDiscs();
          if (isGameOver) return;
          round++;
          roundDisplay.textContent = 'Round: ' + round;
          if (round === 10) {
            targetColor = discColors[Math.floor(Math.random() * discColors.length)];
            instructionDisplay.textContent = `Tap only the ${targetColor} discs!`;
            instructionDisplay.style.display = 'block';
          }
          if (round > 10) {
            instructionDisplay.style.display = 'none';
          }
          update();
        }
      }, 1000);
    }
    
    function gameOver() {
      isGameOver = true;
      gameStarted = false;
      gameOverDisplay.style.display = 'block';
      clearDiscs();
      instructionDisplay.style.display = 'none';
    }
    
    function startGame() {
      startButton.style.display = 'none';
      countdownDisplay.style.display = 'block';
      let count = 3;
      countdownDisplay.textContent = count;
    
      const countdownInterval = setInterval(() => {
        count--;
        countdownDisplay.textContent = count;
        if (count <= 0) {
          clearInterval(countdownInterval);
          countdownDisplay.style.display = 'none';
          isGameOver = false;
          gameStarted = true;
          score = 0;
          round = 1;
          scoreDisplay.textContent = 'Score: 0';
          roundDisplay.textContent = 'Round: 1';
          gameOverDisplay.style.display = 'none';
          update();
        }
      }, 1000);
    }
    
    startButton.addEventListener('click', startGame);
