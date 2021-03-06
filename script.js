'use strict';

//      Dice & Button controls
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Variables
const winningNumber = 100;
let totalScore = [];
let currentScore = [];
let activePlayer;

// Functions
function update(field, player, points) {
    document.getElementById(`${field}--${player}`).textContent = points;
}

function switchPlayer() {
    currentScore[activePlayer] = 0;
    update('current', activePlayer, currentScore[activePlayer]);
    activePlayer = 1 - activePlayer;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    document
        .querySelector(`.player--${1 - activePlayer}`)
        .classList.remove('player--active');
}

function reset() {
    for (let i = 0; i < 2; i++) {
        totalScore[i] = 0;
        currentScore[i] = 0;
        update('score', i, currentScore[i]);
        update('current', i, currentScore[i]);
        document
            .querySelector(`.player--${i}`)
            .classList.remove('player--winner');
    }
    activePlayer = Math.trunc(Math.random() * 2);
    diceEl.classList.add('hidden');
    btnHoldEl.classList.remove('hidden');
    btnRollEl.classList.remove('hidden');
    switchPlayer();
}

function rollDice() {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
        currentScore[activePlayer] += diceRoll;
        update('current', activePlayer, currentScore[activePlayer]);
    } else {
        switchPlayer();
    }
}

function hold() {
    totalScore[activePlayer] += currentScore[activePlayer];
    update('score', activePlayer, totalScore[activePlayer]);
    if (winningNumber <= totalScore[activePlayer]) {
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        diceEl.classList.add('hidden');
        btnHoldEl.classList.add('hidden');
        btnRollEl.classList.add('hidden');
    } else {
        switchPlayer();
    }
}

// Event Handlers
btnNewEl.addEventListener('click', reset);
btnRollEl.addEventListener('click', rollDice);
btnHoldEl.addEventListener('click', hold);

// Init
reset();
