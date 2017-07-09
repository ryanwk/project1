'use strict'
const store = require('./store')

let signedIn = false
let gameHasStarted = false

const signUpSuccess = (data) => {
  $('#sign-up-modal').modal('hide')
  // console.log('user has signed up ' + data)
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
}
const signInFail = () => {
  alert('email or password is not correct')
}
// const gameStatsSuccess = (data) => {
//   console.log('gameStats request worked!')
//   let wins = 0
//   let totalGames = data.length
//   let losses = 0
//   // console.log(data)
//   if (totalGames !== 0) {
//     for (let i = 0; i < data.length; i++) {
//       // if (checkForWin(data[i].cells) === true) {
//       //   wins += 1
//     }
//     losses = totalGames - wins
//   }
//   $('#wins').text('Player 1 won ' + wins + ' games.')
//   $('#losses').text('Player 1 lost ' + losses + ' games.')
//   $('#games').text('Player 1 played ' + totalGames + ' games.')
// }

// const gameStatsFail = () => {
//   console.log('gameStats request did not work')
// }
const signOutSuccess = () => {
  // handle success
  alert('user has signed out')
  store.user = {}
  signedIn = false
}
const updateGameSuccess = () => {
  // handle success
  // console.log('game has been updated with index, letter placed, and game status')
}
const createGameSuccess = (data) => {
  // handle success
  console.log('game has been created: ' + data.game)
  store.game = data.game
  gameHasStarted = true
  $('#directions').text('X goes first!')
  console.table(store)
}
const failure = () => {
  // handle failure
  alert('did not work!')
}

const changePasswordSuccess = (data) => {
  console.log('password changed ' + data.password)
}

const changePasswordFailure = () => {
  // console.log('password change failed')
  // events.originalPasswordMisMatch()
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
  console.log('getGameStatus is invoked and gameHasStarted is: ' + gameHasStarted)
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
  // gameStatsSuccess,
  // gameStatsFail
}
