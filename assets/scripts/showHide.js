'use strict'

const frontPage = function () {
  // $('#gameBoard').hide()
  $('#gameStatsButton').hide()
  $('#changePasswordButton').hide()
  $('#startGame').hide()
  $('#sign-out').hide()
  $('#resetButton').hide()
}
const signInView = function () {
  $('#signInButton').hide()
  $('#signUpButton').hide()
  $('#startGame').show()
  $('#sign-out').show()
  $('#changePasswordButton').show()
}
const signOutView = function () {
  $('#signInButton').show()
  $('#signUpButton').show()
  $('#startGame').hide()
  $('#sign-out').hide()
  $('#changePasswordButton').hide()
  $('#resetButton').hide()
  $('#gameStatsButton').hide()
}
const startGameView = function () {
  $('#gameStatsButton').show()
  $('#resetButton').show()
}

module.exports = {
  frontPage,
  signInView,
  signOutView,
  startGameView
}
