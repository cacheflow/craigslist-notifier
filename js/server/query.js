// import craigslist from  './craigslist';

var kue = require('kue');
var jobs = kue.createQueue();
kue.app.listen(3001)
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
