'use strict'
const events = require('./events')
const config = require('./config')
const store = require('./store')

// links to ui to handle success and failures
const ui = require('./ui')

// these are the requests I make to the api

// values placed into the form fields of the
// sign up button are stored in 'data',
// data is in the getFormFields function

const signUpRequest = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
  .done(ui.signUpSuccess)
  .fail(ui.signUpFailure)
}
const signInRequest = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
  .done(ui.signInSuccess)
  .fail(ui.signInFail)
}
const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
  .done(ui.signOutSuccess)
  .fail(ui.failure)
}
const createGame = function (data) {
  if (!ui.getSignInStatus()) {
    $('#directions').text('You must sign in before starting a game')
    return ui.createGameSuccess
  }
  events.resetBoard()
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
  .done(ui.createGameSuccess)
  .fail(ui.failure)
}

module.exports = {
  signUpRequest,
  signInRequest,
  signOut,
  createGame
}
