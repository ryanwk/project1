'use strict'
const api = require('./api')
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
  // $('.game-cell').on('click', patch.updateServer)
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
      console.log('1st patch request')
      return
    } else {
      gameOver = false
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
      console.log('2nd patch request')
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
      console.log('3rd patch request')
      return
    } else {
      gameOver = false
      updateServer(letter, gameOver, index)
        .done(updateServerSuccess)
        .catch(updateServerFailure)
      console.log('4th patch request')
    }
  }

  if (turnCounter++ === 8) {
    $('#directions').text('Draw!')
    resetBoard()
    gameOver = true
    updateServer(letter, gameOver, index)
      .done(updateServerSuccess)
      .catch(updateServerFailure)
    console.log('5th patch request')
  }
  // onUpdateGame(letter, index, gameOver)
  // console.log('onUpdateGame is being called')
}

// PATCH request
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

// $(event.target).attr('id'); grab id of cell
const updateServerSuccess = () => {
  console.log('PATCH request successful')
}
const updateServerFailure = () => {
  console.log('PATCH request failed')
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
      return true
    } else if (gameState[i] === xIndicator && gameState[i + 3] === xIndicator &&
      gameState[i + 6] === xIndicator) {
      return true
    }
  }
  return false
}
// end board logic

// AJAX

// const onUpdateGame = function (letter, index, gameOver) {
//   console.log('the server has been updated with letter: ' + letter +
//     ', index: ' + index + ', and gameOver: ' + gameOver)
//   const gameData = {
//     'game': {
//       'cell': {
//         'index': index,
//         'value': letter
//       },
//       'over': gameOver
//     }
//   }
//   try {
//     api.updateGame(gameData)
//   } catch (e) {}
//   console.log('onUpdateGame failed')
// }

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
}

module.exports = {
  addHandlers,
  toggleTurn,
  resetBoard,
  index,
  letter,
  gameOver,
  // onUpdateGame,
  onChangePassword,
  updateServer,
  updateServerSuccess,
  updateServerFailure
}
