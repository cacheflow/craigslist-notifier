var Firebase = require('firebase');

var firebaseRef = new Firebase('https://craigslist-notifier.firebaseio.com/')

firebaseRef.on('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.val())
  })
}), (errorObject) => {
  console.log("The read failed with error ", errorObject.code);
};


// var kue = require('kue');
// var queue = kue.createQueue();
// queue.process('food', 6, (job, done) => {
//   console.log("we marking them all as done", job.id)
//   done()
//   return false;
// })
