// 'use strict'
// const config = require('./config')
// const store = require('./store')
// // GET for viewing an already completed game(s) or game(s) in progress
// const gameStatsUpdate = function (data) {
//   console.log('ui.gameStats is being invoked')
//   // console.log(data)
//   // console.log(store.user)
//   return $.ajax({
//     url: config.apiOrigin + '/games?over=true',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data
//   })
//   .done(gameStatsSuccess)
//   .catch(gameStatsFail)
// }
// const gameStatsSuccess = (data) => {
//   console.log('gameStats request worked!')
//   // let wins = 0
//   // let totalGames = data.length
//   // let losses = 0
//   // // console.log(data)
//   // if (totalGames !== 0) {
//   //   for (let i = 0; i < data.length; i++) {
//       // wtf am I doing here?
//       // if (checkForWin(data[i].cells) === true) {
//       //   wins += 1
//     // }
//     // losses = totalGames - wins
//   // }
//   // // displays game data in UI
//   // $('#wins').text('Player 1 won ' + wins + ' games.')
//   // $('#losses').text('Player 1 lost ' + losses + ' games.')
//   // $('#games').text('Player 1 played ' + totalGames + ' games.')
// }
// const gameStatsFail = () => {
//   console.log('gameStats request did not work')
// }
// // when someone clicks the button it should invoke the gameStats API request
// const onGameStatsClick = function (e) {
//   e.preventDefault()
//   $('#gameStatsButton').on('submit', gameStatsUpdate)
// }
// module.exports = {
//   gameStatsUpdate,
//   onGameStatsClick
// }
