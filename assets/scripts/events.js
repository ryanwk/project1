'use strict'
const api = require('./api')
const ui = require('./ui')
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
}

// begin board logic
const resetBoard = function () {
  xTurn = true
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turnCounter = 0
  ui.resetGameStatusVar()
  for (let i = 0; i < 9; i++) {
    // Resets text of each cell
    $(document.getElementById(i)).text('')
  }
}

// invoked with a click on a cell of the gameboard, places a symbol in the corresponding cell, updates the gameState array with a new value, update boolean to switch players turn
const toggleTurn = function (event) {
  index = $(event.target).attr('id')
  // console.log('this is index: ' + index)
  console.log('xturn: ' + xTurn + '' + 'gameOver status is: ' + gameOver)
  if (!ui.getGameStatus()) {
    $('#directions').text('Click start game!')
    return
  }
  debugger
  // console.log('its working' + ui.getGameStatus())
  if (gameState[this.id] !== 0) {
    return
  }
  if (xTurn) {
    console.log('xTurn if has been invoked')
    $(this).text('X')
    $('#directions').text('O\'s turn')
    xTurn = false
    console.log('xturn is currently: ' + '' + xTurn + '' + 'gameOver status is: ' + gameOver)
    letter = 'X'
    gameState[this.id] = 1
    if (checkForWin(1)) {
      $('#directions').text('X Wins!')
      resetBoard()
      gameOver = true
      // console.log('this is gameOver: ' + gameOver)
    }
  } else {
    console.log('else xTurn has been invoked, handling O turn')
    $(this).text('O')
    $('#directions').text('X\'s turn')
    letter = 'O'
    xTurn = true
    console.log('xturn is currently: ' + '' + xTurn + '' + 'gameOver status is: ' + gameOver)
    index = $(event.target.id)
    gameState[this.id] = 2
    if (checkForWin(2)) {
      $('#directions').text('O Wins!')
      gameOver = true
      resetBoard()
      // console.log('this is gameOver: ' + gameOver)
    }
  }
  console.log('this is letter: ' + letter)

  if (turnCounter++ === 8) {
    $('#directions').text('Draw!')
    resetBoard()
    gameOver = true
  }
  // console.log(turnCounter)
  console.log('ToggleTurn returns this is gameOver: ' + gameOver)
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
  console.log('the server has been updated with letter, index, and gameOver')
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
