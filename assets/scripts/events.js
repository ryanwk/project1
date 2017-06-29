'use strict'

let xTurn = true
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let turnCounter = 0

const addHandlers = function () {
  $('.game-cell').on('click', toggleTurn)
  $('#resetButton').on('click', resetBoard)
}

const resetBoard = function () {
  xTurn = true
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turnCounter = 0
  for (let i = 0; i < 9; i++) {
    $(document.getElementById(i)).text(i)
  }
}

const toggleTurn = function (event) {
  if (gameState[this.id] === 0) {
    if (xTurn) {
      $(this).text('X')
      xTurn = false
      gameState[this.id] = 1
      if (checkForWin(1)) {
        alert('X wins!')
      }
    } else {
      $(this).text('O')
      xTurn = true
      gameState[this.id] = 2
      if (checkForWin(2)) {
        alert('O wins!')
      }
    }
  }
  if (turnCounter++ === 8) {
    alert('draw!')
  }
  console.log(turnCounter)
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

module.exports = {
  addHandlers,
  toggleTurn,
  resetBoard
}
