'use strict';

// DOM links

//      Dice controls
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Variables
let score = [];
let current = [];
let pTurn;

// Functions
function updateCurrent(player, points) {
    document.getElementById(`current--${player}`).textContent = points;
}

function updateScore(player, points) {
    document.getElementById(`score--${player}`).textContent = points;
}

function reset() {
    for (let i = 0; i < 2; i++) {
        score[i] = 0;
        current[i] = 0;
        updateScore(i, current[i]);
        updateCurrent(i, current[i]);
    }
    pTurn = Math.trunc(Math.random() * 2);
    diceEl.classList.add('hidden');
}

function rollDice() {
    // 1. Generate a random dice roll.
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for 1-roll, if true, switch  player.
    if (diceRoll !== 1) {
        current[pTurn] += diceRoll;
        updateCurrent(pTurn, current[pTurn]);
    } else {
        current[pTurn] = 0;
        updateCurrent(pTurn, current[pTurn]);
        pTurn = 1 - pTurn;
    }
}

function switchPlayer() {
    score[pTurn] += current[pTurn];
    current[pTurn] = 0;
    updateCurrent(pTurn, current[pTurn]);
    updateScore(pTurn, score[pTurn]);
    pTurn = 1 - pTurn;
}

// Event Handlers
btnRollEl.addEventListener('click', rollDice);
btnNewEl.addEventListener('click', reset);
btnHoldEl.addEventListener('click', switchPlayer);

// Init
reset();
console.log(pTurn);
