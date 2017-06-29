'use strict'
const store = require('./store')
const success = (data) => {
  // handle success
  console.log('user has signed out: ' + data)
}
const signUpSuccess = (data) => {
  // handle success
  console.log('user has signed out: ' + data)
}
const signInSuccess = (data) => {
  // handle success
  console.log('user has signed in: ' + data)
  store.user = data.user
}
const signOutSuccess = () => {
  // handle success
  console.log('user has signed out')
  store.user = {}
}
const failure = () => {
  // handle failure
  console.log('the request did not work!')
}

// const onSuccess = function (data) {
//   if (!data.userName) {
//     console.log('user name')
//   } else if (data.UserName) {
//     console.log(data.UserName)
//   // } else {
//   //   console.table(data.userName)
//   // }
//   // console.table(data.book) this function will allow you to
//   // get the data from books and
//   // represents it with a table in the console
// }
// // this message will appear in the console when a book has been deleted
// // const onDeleteSuccess = function (data) {
// //   console.log('book has been deleted!')
// // }
//
// // determines the message that you see in console when something went wrong
// // when using submit
// const onError = function () {
//   console.log('error!')
// }
//
module.exports = {
  success,
  failure,
  signInSuccess,
  signUpSuccess,
  signOutSuccess
}
