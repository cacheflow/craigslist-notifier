// import craigslist from  './craigslist';
var firebase = require('firebase');
var firebaseRef = new Firebase('https://craigslist-notifier.firebaseio.com/listings')
var kue = require('kue');
var queue = kue.createQueue();
var craigslist = require('./craigslist');

firebaseRef.once("value", (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    queue.create("scrape", {
      name: childSnapshot.val().name,
      number: childSnapshot.val().number,
      section: childSnapshot.val().section,
      city: childSnapshot.val().city,
    }).save()
  })
})


queue.process("scrape", 100, (job, done) => {
  var jobData = job.data;
  craigslist.query(jobData, done);
});

//poll the database and pull out the data then
//create a job that scrapes and pass along the params
//if there are new ads then create another job that
//sends text messages

  // setInterval( () => {
  //   var links = [];
  //   firebaseRef.once('value', (snapshot) => {
      // snapshot.forEach((childSnapshot) => {
      //   links.push(childSnapshot.val())
      // })
  //   }, (errorObject) => {
  //     console.log("The read failed with error ", errorObject.code);
  //   })
  //   console.log(links)
  // }, 5000)

// jobs.create('scrape', {
//   site: 'https://losangeles.craigslist.org/search/hhh?sort=date&sale_date=2016-02'
// }).save();
//
// jobs.process('scrape', (job, done) => {
//   console.log("we querying");
// });


// var scrapeQueue = Queue('sraping craigslist', 6379 , '127.0.0.1');
//
// scrapeQueue.on('progress', (job, progress) => {
//   console.log("your progress is", progress);
// });
//
// scrapeQueue.on('completed', (job, result) => {
//   console.log("your job is completed", job.jobId);
// });
//
// scrapeQueue.process((job, done) => {
//   craigslist.query(done).next();
// });
//
// var createJob = () => {
//   scrapeQueue.add({site: 'https://losangeles.craigslist.org/search/hhh?sort=date&sale_date=2016-02-'});
// }
//
//
// module.exports = createJob;
