'use strict'

const frontPage = function () {
  $('#gameBoard').hide()
  $('#gameStatsButton').hide()
  $('#changePasswordButton').hide()
  $('#startGame').hide()
  $('#sign-out').hide()
  $('#resetButton').hide()
  $('#changePassNotification').text('').hide()
  $('#gameStatsNotification').text('').hide()
}
const signInView = function () {
  $('#signInButton').hide()
  $('#signUpButton').hide()
  $('#startGame').show()
  $('#sign-out').show()
  $('#changePasswordButton').show()
  $('#resetButton').hide()
}
const signOutView = function () {
  $('#signInButton').show()
  $('#signUpButton').show()
  $('#startGame').hide()
  $('#sign-out').hide()
  $('#changePasswordButton').hide()
  $('#resetButton').hide()
  $('#gameStatsButton').hide()
  $('#gameBoard').hide()
  $('#changePassNotification').text('').hide()
  $('#gameStatsNotification').text('').hide()
}
const startGameView = function () {
  $('#gameStatsButton').show()
  $('#gameBoard').show()
}

module.exports = {
  frontPage,
  signInView,
  signOutView,
  startGameView
}
