'use strict'
const config = require('./config')
const store = require('./store')

// GET for viewing an already completed game(s) or game(s) in progress
const gameStatsUpdate = function (data) {
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
  // console.log(data.games.length)
  $('#gameStatsNotification').text('Total number of games played is: ' + data.games.length).show()
}
const gameStatsFail = () => {

}

module.exports = {
  gameStatsUpdate
}
