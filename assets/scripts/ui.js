'use strict'
const store = require('./store')

let signedIn = false
let gameHasStarted = false

const signUpSuccess = (data) => {
  $('#sign-up-modal').modal('hide')
  $('#inputEmail4').val('')
  $('#inputPassword4').val('')
}

const signUpFailure = (data) => {
  alert('sign up did not work')
}

const signInSuccess = (data) => {
  $('#sign-in-modal').modal('hide')
  $('#directions').text('Click \'start game\' button to begin!')
  console.log('user has signed in: ' + data)
  store.user = data.user
  signedIn = true
  $('#inputEmail3').val('')
  $('#inputPassword3').val('')
}
const signInFail = () => {
  alert('email or password is not correct')
}
const signOutSuccess = () => {
  alert('user has signed out')
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
  alert('did not work!')
}

const changePasswordSuccess = (data) => {
  console.log('password changed ')
}

const changePasswordFailure = () => {

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
  changePasswordSuccess
}
