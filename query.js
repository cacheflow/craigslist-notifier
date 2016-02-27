import craigslist from  './craigslist';

var Queue = require('bull');

var scrapeQueue = Queue('sraping craigslist', 6379 , '127.0.0.1');

scrapeQueue.on('progress', (job, progress) => {
  console.log("your progress is", progress);
});

scrapeQueue.on('completed', (job, result) => {
  console.log("your job is completed", job.jobId);
});

scrapeQueue.process((job, done) => {
  var finished = done
  craigslist.query(finished)
});

var createJob = () => {
  scrapeQueue.add({site: 'https://losangeles.craigslist.org/search/hhh?sort=date&sale_date=2016-02-'});
}

createJob()
