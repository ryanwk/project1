'use strict'
const config = require('./config')
const store = require('./store')

// GET for viewing an already completed game(s) or game(s) in progress
const gameStatsUpdate = function (data) {
  console.log('gameStatsUpdate is being invoked')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
  .done(gameStatsSuccess)
  .catch(gameStatsFail)
}
const gameStatsSuccess = (data) => {
  console.log('gameStats request worked!')
  console.log(data.games.length)
  $('#directions').text('Total number of games played is: ' + data.games.length)
}
const gameStatsFail = () => {
  console.log('gameStats request did not work')
}

module.exports = {
  gameStatsUpdate

}
