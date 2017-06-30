'use strict'
// a function given to me to deal with inputs on forms
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// links to events.js file and adds handlers
const events = require('./events')

require('./example')

$(() => {
  events.addHandlers()
})

// checks if doc is ready and uses jQuery to
// handle requests to the api when buttons are clicked
$(() => {
  $('#sign-up-form').on('submit', function (e) {
    const data = getFormFields(this)
    e.preventDefault()
    api.signUpRequest(data)
  })
  $('#sign-in-form').on('submit', function (e) {
    const data = getFormFields(this)
    e.preventDefault()
    api.signInRequest(data)
  })
  $('#sign-out').on('click', function (e) {
    // const data = getFormFields(this)
    e.preventDefault()
    api.signOut()
  })
  $('#startGame').on('click', function (e) {
    // const data = getFormFields(this)
    e.preventDefault()
    api.createGame()
  })
})
