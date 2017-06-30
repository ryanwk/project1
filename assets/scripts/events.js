'use strict'
const api = require('./api')
const ui = require('./ui')
// import gameHasStarted from './ui'

let xTurn = true
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let turnCounter = 0

let index = ''
let letter = ''
let gameOver = false

// event listeners
const addHandlers = function () {
  $('.game-cell').on('click', toggleTurn)
  $('#resetButton').on('click', resetBoard)
}

// begin board logic
const resetBoard = function () {
  xTurn = true
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turnCounter = 0
  ui.resetGameStatusVar()
  for (let i = 0; i < 9; i++) {
    // Resets text of each cell
    $(document.getElementById(i)).text(i)
  }
}

// invoked with a click on a cell of the gameboard, places a symbol in the corresponding cell, updates the gameState array with a new value, update boolean to switch players turn
const toggleTurn = function (event) {
  index = $(event.target).attr('id')
  // console.log('this is index: ' + index)
  if (!ui.getGameStatus()) {
    alert('You must click \'start game\' button to start the game')
    return
  }
  // console.log('its working' + ui.getGameStatus())
  if (gameState[this.id] !== 0) {
    return
  }
  if (xTurn) {
    $(this).text('X')
    xTurn = false
    letter = 'X'
    gameState[this.id] = 1
    if (checkForWin(1)) {
      alert('X wins!')
      resetBoard()
      gameOver = true
      // console.log('this is gameOver: ' + gameOver)
    }
  } else {
    $(this).text('O')
    letter = 'O'
    xTurn = true
    index = $(event.target.id)
    gameState[this.id] = 2
    if (checkForWin(2)) {
      alert('O wins!')
      gameOver = true
      resetBoard()
      // console.log('this is gameOver: ' + gameOver)
    }
  }
  // console.log('this is letter: ' + letter)

  if (turnCounter++ === 8) {
    alert('draw!')
    resetBoard()
    gameOver = true
  }
  // console.log(turnCounter)
  // console.log('this is gameOver: ' + gameOver)
  onUpdateGame(letter, index, gameOver)
}

const checkForWin = function (i) {
  // Check diagonals for wins
  if (gameState[0] === i && gameState[4] === i && gameState[8] === i) {
    return true
  } else if (gameState[2] === i && gameState[4] === i && gameState[6] === i) {
    return true
  }
  // Check horizontal and vertical columns for wins
  for (let i = 0; i < 3; i++) {
    // Check horizontal columns for win
    if (gameState[i * 3] === i && gameState[i * 3 + 1] === i && gameState[i * 3 + 2] === i) {
      return true
    } else if (gameState[i] === i && gameState[i + 3] === i && gameState[i + 6] === i) {
      return true
    }
  }
  return false
}
// end board logic

// ajax
const onUpdateGame = function (letter, index, gameOver) {
  // console.log('onUpdateGame is being invoked')
  const gameData = {
    'game': {
      'cell': {
        'index': index,
        'value': letter
      },
      'over': gameOver
    }
  }
  try {
    api.updateGame(gameData)
  } catch (e) {
  }
}

module.exports = {
  addHandlers,
  toggleTurn,
  resetBoard,
  index,
  letter,
  gameOver,
  onUpdateGame
}
