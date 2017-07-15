'use strict'
const ui = require('./ui')
const gameStats = require('./gameStats')
const getFormFields = require('../../lib/get-form-fields')
const config = require('./config')
const store = require('./store')

let xTurn = true
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let turnCounter = 0

let index = 0
let letter = ''
let gameOver = false

// event listeners
const addHandlers = function () {
  $('.game-cell').on('click', toggleTurn)
  $('#resetButton').on('click', resetBoard)
  $('#change-pwd').on('submit', onChangePassword)
  $('#gameStatsButton').on('click', gameStats.gameStatsUpdate)
  $('.buttonCloseSignUp').on('click', ui.modalEscapeSignUp)
  $('.buttonCloseSignIn').on('click', ui.modalEscapeSignIn)
  $('.buttonCloseChangePassword').on('click', ui.changePasswordEscape)
}

// begin board logic
const resetBoard = function () {
  $('#directions').text('Click start game!')
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
  }
  if (gameState[index] !== 0) {
    return
  }
  if (gameOver === true) {
    return
  }
  if (xTurn) {
    $(this).text('X')
    $('#directions').text('O\'s turn')
    xTurn = false
    letter = 'x'
    gameState[index] = 1
    if (checkForWin(1)) {
      $('#directions').text('X Wins!')
      resetBoard()
      gameOver = true
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
      return
    } else {
      gameOver = false
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
    }
  } else {
    $(this).text('O')
    $('#directions').text('X\'s turn')
    letter = 'o'
    xTurn = true
    gameState[index] = 2
    if (checkForWin(2)) {
      $('#directions').text('O Wins!')
      gameOver = true
      resetBoard()
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
      return
    } else {
      gameOver = false
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
    }
  }

  if (turnCounter++ === 8) {
    $('#directions').text('Draw!')
    resetBoard()
    gameOver = true
    updateServer(letter, gameOver, index)
      .done(updateServerSuccess)
      .catch(updateServerFailure)
  }
}

// PATCH request to provide the server with stored data which can be accessed with the Show Game Data button. On every click of the board the index, letter (x/o), and game status (over: true/false) is recorded.
const updateServer = function (position, player, status) {
  console.log(position, player, status)
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify({
      game: {
        cell: {
          index: position,
          value: player
        },
        over: status
      }
    })
  })
}

const updateServerSuccess = () => {
}
const updateServerFailure = () => {
}
// end updateServer Patch request

// this function checks if there are any combination of 3 letters in a row and
// determines a winner
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
      return true
    } else if (gameState[i] === xIndicator && gameState[i + 3] === xIndicator &&
      gameState[i + 6] === xIndicator) {
      return true
    }
  }
  return false
}
// end board logic

// changes password and stores credentials
const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
    .done(ui.changePasswordSuccess)
    .fail(ui.changePasswordFailure)
}

module.exports = {
  addHandlers,
  toggleTurn,
  resetBoard,
  index,
  letter,
  gameOver,
  onChangePassword,
  updateServer,
  updateServerSuccess,
  updateServerFailure
}
