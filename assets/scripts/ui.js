'use strict'
const store = require('./store')

let signedIn = false
let gameHasStarted = false

const signUpSuccess = (data) => {
  $('#sign-up-modal').modal('hide')
  $('#inputEmail4').val('')
  $('#inputPassword4').val('')
  $('#directions').text('Thanks for signing up! Now sign in to play!')
  $('#SignUpFailure').text('')
}

// when a user clicks the 'x' to close a modal at any point this will clear the email/password/and signUpFaile text of the sign up modal
const modalEscapeSignUp = () => {
  $('#SignUpFailure').text('')
  $('#inputEmail4').val('')
  $('#inputPassword4').val('')
}
// when a user clicks the 'x' to close a modal at any point this will clear the email/password/and signUpFaile text of the sign in modal
const modalEscapeSignIn = () => {
  $('#SignInFailure').text('')
  $('#inputEmail3').val('')
  $('#inputPassword3').val('')
}

const signUpFailure = (data) => {
  $('#SignUpFailure').text('Sign up did not work, please try again.')
}

const signInSuccess = (data) => {
  $('#sign-in-modal').modal('hide')
  $('#directions').text('Welcome ' + data.user.email + '!' + ' Click Start Game to begin!')
  store.user = data.user
  signedIn = true
  $('#inputEmail3').val('')
  $('#inputPassword3').val('')
  $('#SignInFailure').text('')
}
const signInFail = () => {
  $('#SignInFailure').text('Email or password is not correct, please try again.')
}
const signOutSuccess = (data) => {
  $('#directions').text('Sign up or sign in to play!')
  store.user = {}
  signedIn = false
  $('#inputEmail3').val('')
  $('#inputPassword3').val('')
}
const updateGameSuccess = () => {
  console.log('game has been updated with index, letter placed, and game status')
}
const createGameSuccess = (data) => {
  console.log('game has been created: ' + data.game)
  store.game = data.game
  gameHasStarted = true
  $('#directions').text('X goes first!')
  console.table(store)
}
const failure = () => {
  console.log('something did not work!')
}

// when a user clicks the 'x' to close a modal at any point this will clear the email/password/and signUpFaile text of the sign in modal
const changePasswordEscape = () => {
  $('#changePasswordFailure').text('')
  $('#currentPassword').val('')
  $('#newPassword').val('')
}
const changePasswordSuccess = (data) => {
  $('#change-pass-modal').modal('hide')
  $('#changePasswordFailure').text('')
  $('#currentPassword').val('')
  $('#newPassword').val('')
  $('#directions').text('Password has been changed.').fadeOut(4000)
}

const changePasswordFailure = () => {
  $('#changePasswordFailure').text('Password\'s don\'t match, try again.')
}
const resetGameStatusVar = () => {
  gameHasStarted = false
  console.log('resetGameStatusVar is invoked and gameHasStarted is: ' + gameHasStarted)
}

const getSignInStatus = () => {
  console.log('getSignInStatus is invoked and signedIn is: ' + signedIn)
  return signedIn
}

const getGameStatus = () => {
  // console.log('getGameStatus is invoked and gameHasStarted is: ' + gameHasStarted)
  return gameHasStarted
}

module.exports = {
  failure,
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  updateGameSuccess,
  createGameSuccess,
  getSignInStatus,
  resetGameStatusVar,
  getGameStatus,
  changePasswordFailure,
  changePasswordSuccess,
  modalEscapeSignUp,
  modalEscapeSignIn,
  changePasswordEscape
}
