var moment = require('moment');
var osmosis = require('osmosis');
var twilio = require('./twilio');
var Promise = require('bluebird');
var kue = require('kue');
var queue = kue.createQueue();
require('parsleyjs');

var craigslist = {
  queryParams: {
     date: 'time@datetime',
    link: 'a@href',
  },
  craigslistRegex: /(https?:\/\/)(\w+)/,
  site: "https://losangeles.craigslist.org/search/hhh",
  craigslistAds: [],
  query(jobData, finished) {
    var currentDate = moment().format('YYYY-MM-DD')
    var url = `https://${jobData.city}.craigslist.org/search/${jobData.section}?sort=date&sale_date=${currentDate}`
    return new Promise ((resolve, reject) => {
      osmosis.get(url).find('span.pl').set(this.queryParams).then((context, data, next, done) => {
        this.craigslistAds.push(data);
        resolve(this.craigslistAds);
      })
    }).then(() => {
      this.checkForNewAds(jobData, finished);
    });
  },
  checkForNewAds(jobData, finished) {
    var anHourAgo = moment().subtract({'minutes': 60});
    var newAds = [];
    this.craigslistAds.map((currentValue, index, array) => {
     if(moment(currentValue.date, 'YYYY-MM-DD HH:mm').isAfter(anHourAgo)) {
      newAds.push(currentValue.link);
     }
     else {
       return;
     }
   });
   if(newAds.length > 0) {
     this.craigslistAds.length = 0;
     console.log("craigslist ads length is ", this.craigslistAds.length);
     var randomAd = newAds[Math.floor(Math.random() * newAds.length)];
     var linkToSend = `http://${jobData.city}.craigslist.com${randomAd}`;
     newAds.length = 0;
     finished()
     queue.create("send text", {
       name: jobData.name,
       number: jobData.number,
       link: linkToSend
     }).save()
     this.sendTextMessage()
   }
   else {
     console.log("nothing here");
     finished();
     return;
   }
  },

  sendTextMessage() {
    queue.process("send text", 100, (job, done) => {
      twilio.sendMessage({
        to: `+1${job.data.number}`,
        from: "+18553381680",
        body: `${job.data.name} this new listing is here ${job.data.link}`
      }, (err, responseData) => {
        if(!err) {
          console.log("woo no errors");
          done()
        }
        else {
          console.log(err)
          done()
        }
      });
    })
  }
};

module.exports = craigslist;
