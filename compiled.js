'use strict';

var _api = require('./utils/api.js');

var kue = require('kue');
var jobs = kue.createQueue();
var noodle = require('noodlejs');

var create = function create() {
  var job = jobs.create('craigslist', {
    desc: "scraping craigslist"
  });

  job.on('complete', function () {
    return console.log('job complete');
  });
  job.on('failed', function () {
    return console.log('job failed');
  });
  job.on('progress', function (progress) {
    return console.log('current progress is %complete');
  });

  job.save();
  setTimeout(create, 4100);
};

create();

jobs.process('craigslist', 1, function (job, done) {
  return (0, _api.scrapeCraigslist)(job, done);
});
