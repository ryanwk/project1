'use strict'
const store = require('./store')
let signedIn = false
let gameHasStarted = false

const success = (data) => {
  // handle success
  console.log('it works!')
}
const signUpSuccess = (data) => {
  // handle success
  console.log('user has signed up ' + data)
}
const signInSuccess = (data) => {
  // handle success
  console.log('user has signed in: ' + data)
  store.user = data.user
  signedIn = true
}
const signOutSuccess = () => {
  // handle success
  console.log('user has signed out')
  store.user = {}
  signedIn = false
}
const updateGameSuccess = () => {
  // handle success
  console.log('game has been updated with index, letter placed, and game status')
}
const createGameSuccess = (data) => {
  // handle success
  console.log('game has been created: ' + data)
  store.game = data.game
  gameHasStarted = true
}
const failure = () => {
  // handle failure
  console.log('the request did not work!')
}

const resetGameStatusVar = () => {
  gameHasStarted = false
}

const getSignInStatus = () => {
  return signedIn
}

const getGameStatus = () => {
  return gameHasStarted
}

module.exports = {
  success,
  failure,
  signInSuccess,
  signUpSuccess,
  signOutSuccess,
  updateGameSuccess,
  createGameSuccess,
  getSignInStatus,
  resetGameStatusVar,
  getGameStatus
}
