'use strict'
const api = require('./api')
const ui = require('./ui')
const gameStats = require('./gameStats')
// require store if chngpwd mismatch function works
// const store = require('./store')
const getFormFields = require('../../lib/get-form-fields')
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
  $('#change-pwd').on('submit', onChangePassword)
  $('#gameStatsButton').on('click', gameStats.gameStatsUpdate)
}

// begin board logic
const resetBoard = function () {
  xTurn = true
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turnCounter = 0
  gameOver = false
  ui.resetGameStatusVar()
  for (let i = 0; i < 9; i++) {
    // Resets text of each cell
    $(document.getElementById(i)).text('')
  }
}

// invoked with a click on a cell of the gameboard, places a symbol in the corresponding cell, updates the gameState array with a new value, update boolean to switch players turn
const toggleTurn = function (event) {
  index = $(event.target).attr('id')
  if (!ui.getGameStatus()) {
    $('#directions').text('Click start game!')
    return
  }
  if (gameState[index] !== 0) {
    return
  }
  if (xTurn) {
    $(this).text('X')
    $('#directions').text('O\'s turn')
    xTurn = false
    letter = 'X'
    gameState[index] = 1
    if (checkForWin(1)) {
      $('#directions').text('X Wins!')
      resetBoard()
      gameOver = true
    }
  } else {
    $(this).text('O')
    $('#directions').text('X\'s turn')
    letter = 'O'
    xTurn = true
    gameState[index] = 2
    if (checkForWin(2)) {
      $('#directions').text('O Wins!')
      gameOver = true
      resetBoard()
    }
  }

  if (turnCounter++ === 8) {
    $('#directions').text('Draw!')
    resetBoard()
    gameOver = true
  }

  onUpdateGame(letter, index, gameOver)
  console.log('onUpdateGame is being called')
}

const checkForWin = function (xIndicator) {
  // Check diagonals for wins
  if (gameState[0] === xIndicator && gameState[4] === xIndicator &&
    gameState[8] === xIndicator) {
    return true
  } else if (gameState[2] === xIndicator && gameState[4] === xIndicator &&
    gameState[6] === xIndicator) {
    return true
  }
  // Check horizontal and vertical columns for wins
  for (let i = 0; i < 3; i++) {
    // Check horizontal columns for win
    if (gameState[i * 3] === xIndicator && gameState[i * 3 + 1] === xIndicator &&
      gameState[i * 3 + 2] === xIndicator) {
      console.log('first if statement: i = ' + i)
      return true
    } else if (gameState[i] === xIndicator && gameState[i + 3] === xIndicator &&
      gameState[i + 6] === xIndicator) {
      console.log('second if statement')
      return true
    }
  }
  return false
}
// end board logic

// ajax

const onUpdateGame = function (letter, index, gameOver) {
  console.log('the server has been updated with letter: ' + letter +
              ', index: ' + index + ', and gameOver: ' + gameOver)
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
  } catch (e) {}
}

const onChangePassword = function (event) {
  // console.log('onChangePassword invoked')
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
}

// Display a message when original password is incorrect
// const originalPasswordMissMatch = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   let oldPassword = $('#passwordMatch').val()
//   console.log(oldPassword)
//   let storedPassword = data.user.password
//   if (!oldPassword === storedPassword) {
//     console.log('oldPassword matches the stored password!')
//   }
// }

module.exports = {
  addHandlers,
  toggleTurn,
  resetBoard,
  index,
  letter,
  gameOver,
  onUpdateGame,
  onChangePassword
  // originalPasswordMissMatch
}
