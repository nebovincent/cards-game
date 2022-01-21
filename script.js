'use strict';

// pig game
const player0Div = document.querySelector('.player--0');

const player1Div = document.querySelector('.player--1');

const player1 = document.querySelector('#name--0');

const player2 = document.querySelector('#name--1');

const totalScore0 = document.querySelector('#score--0');

const totalScore1 = document.querySelector('#score--1');

const currentScore0 = document.querySelector('#current--0');

const currentScore1 = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');

// const diceElement = document.getElementsByClassName('dice');

const newGameBtn = document.querySelector('.btn--new');

const rollDiceBtn = document.querySelector('.btn--roll');

const holdBtn = document.querySelector('.btn--hold');

let scores = [0, 0];

let currentScore = 0;

let activePlayer = 0;

totalScore0.textContent = 0;
totalScore1.textContent = 0;

const restartGame = function () {
  scores = [0, 0];
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  gameOnButton();
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceElement.classList.add('hidden');
  player0Div.classList.add('player--active');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};

diceElement.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // actual switch
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Div.classList.toggle('player--active');
  player1Div.classList.toggle('player--active');
};

const gameOver = function () {
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
};

const gameOnButton = function () {
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
};

rollDiceBtn.addEventListener('click', function () {
  // 1. Generating a random dice

  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice

  diceElement.src = `dice-${dice}.png`;
  diceElement.classList.remove('hidden');

  // 3. Check for a rolled one; if true switch to next player

  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  if (scores[activePlayer] >= 20) {
    document.getElementById(`score--${activePlayer}`).textContent = 'wins';

    gameOver();
    diceElement.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

newGameBtn.addEventListener('click', function () {
  if (scores[0] >= 20 || scores[1] >= 20) {
    restartGame();
  }
});

// newGameBtn.addEventListener('click', restartGame);
