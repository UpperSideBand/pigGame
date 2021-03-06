'use strict';

// Dice & Button controls
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const diceEl = document.querySelector('.dice');

// Global Constants
const winningNumber = 100;

// Global Variables
let activePlayer;
let currentScore = [];
let totalScore = [];

// Functions
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
        btnHold.classList.add('hidden');
        btnRoll.classList.add('hidden');
    } else {
        switchPlayer();
    }
}

function init() {
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
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
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

function update(field, player, points) {
    document.getElementById(`${field}--${player}`).textContent = points;
}

// Event Handlers
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
btnRoll.addEventListener('click', rollDice);

// Init
init();
