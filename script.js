'use strict';

// DOM links

//      Dice & Button controls
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Variables
let score = [];
let current = [];
let activePlayer;

// Functions
function updateCurrent(player, points) {
    document.getElementById(`current--${player}`).textContent = points;
}

function updateScore(player, points) {
    document.getElementById(`score--${player}`).textContent = points;
}

function switchPlayer() {
    current[activePlayer] = 0;
    updateCurrent(activePlayer, current[activePlayer]);
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
        score[i] = 0;
        current[i] = 0;
        updateScore(i, current[i]);
        updateCurrent(i, current[i]);
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
    // 1. Generate a random dice roll.
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for 1-roll, if true, switch  player.
    if (diceRoll !== 1) {
        current[activePlayer] += diceRoll;
        updateCurrent(activePlayer, current[activePlayer]);
    } else {
        switchPlayer();
    }
}

function hold() {
    score[activePlayer] += current[activePlayer];
    updateScore(activePlayer, score[activePlayer]);
    if (20 <= score[activePlayer]) {
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
