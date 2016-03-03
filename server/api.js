'use strict';

var _craigslist = require('./craigslist');

var _craigslist2 = _interopRequireDefault(_craigslist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queue = require('bull');

var scrapeQueue = Queue('sraping craigslist', 6379, '127.0.0.1');

scrapeQueue.on('progress', function (job, progress) {
  console.log("your progress is", progress);
});

scrapeQueue.on('completed', function (job, result) {
  console.log("your job is completed", job.jobId);
});

scrapeQueue.process(function (job, done) {
  _craigslist2.default.query(done);
});

var createJob = function createJob() {
  scrapeQueue.add({ site: 'https://losangeles.craigslist.org/search/hhh?sort=date&sale_date=2016-02-' });
};

createJob();
