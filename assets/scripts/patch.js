// 'use strict'
// const config = require('./config')
// const store = require('./store')
//
// // PATCH request
// const updateServer = function (position, player, status) {
//   console.log(position, player, status)
//   return $.ajax({
//     url: config.apiOrigin + '/games/' + store.game.id,
//     method: 'PATCH',
//     contentType: 'application/json',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: JSON.stringify({
//       game: {
//         cell: {
//           index: position,
//           value: player
//         },
//         over: status
//       }
//     })
//   })
// }
//
// const test = function () {
//   console.log('hello')
// }
// // $(event.target).attr('id'); grab id of cell
// const updateServerSuccess = () => {
//   console.log('PATCH request successful')
// }
// const updateServerFailure = () => {
//   console.log('PATCH request failed')
// }
//
// // a cell the index #, letter, and game status is stored as a variable that gets used by a function that converts the information into JSON
// // const recordData = () => {
// //   const playerX = store.game.player_x
// //   const playerO = store.game.player_o
// //   const index = store.game.cells
// //   const gameOver = store.game.over
// //   console.log(playerX + playerO + index + gameOver)
// //   console.log('listening to click')
// // }
// // when you click a cell of the board the index #, letter, and game status is put in JSON then sent to a function that handles a PATCH request to update the server
// // const convertToJSON = function (letter, index, gameOver) {
// //   console.log('taking index #, letter, and game status, then converting to JSON')
// //   const gameData = {
// //     'game': {
// //       'cell': {
// //         'index': index,
// //         'value': letter
// //       },
// //       'over': gameOver
// //     }
// //   }
// //   .done(convertToJSONSuccess)
// //   .catch(convertToJSONFailure)
// // }
// //
// //   const convertToJSONSuccess = () => {
// //     console.log('JSON successful')
// //     updateServer()
// //   }
// //   const convertToJSONFailure = () => {
// //     console.log('JSON failed')
// //   }
//
// module.export = {
//   // recordData,
//   updateServer,
//   updateServerSuccess,
//   updateServerFailure,
//   test
// }
