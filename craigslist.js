var moment = require('moment');
var osmosis = require('osmosis');
var twilio = require('./twilio');
var Promise = require('bluebird');

var craigslist = {
  queryParams: {
     date: 'time@datetime',
    link: 'a@href',
  },
  craigslistRegex: /(https?:\/\/)(\w+)/,
  site: "http://losangeles.craigslist.org/search/hhh",
  craigslistAds: [],
  query(finished) {
    console.log("calling query");
    var hourAgo = moment().subtract('60', 'minutes');
    var kueDone = finished;
    return new Promise ((resolve, reject) => {
      osmosis.get(this.site).find('span.pl').set(this.queryParams).then((context, data, next, done) => {
        this.craigslistAds.push(data)
        resolve(this.craigslistAds)
      })
    }).then(() => {
      this.checkForNewAds();
    });
  },

  checkForNewAds() {
    var site = this.site;
    var anHourAgo = moment().subtract('60', 'minutes');
    var newAds = [];
    this.craigslistAds.map((currentValue, index, array) => {
     if(moment(currentValue.date, 'YYYY-MM-DD HH:mm').isAfter(anHourAgo)) {
      newAds.push(currentValue.link);
     }
   });
   var random = newAds[Math.floor(Math.random() & newAds.length)];
   var craigslistAd = this.craigslistRegex.exec(this.site)
   console.log("random", "http://" + craigslistAd[2] + ".craigslist.com" + random);
  },


  sendTextMessage(linkToSend) {
    twilio.sendMessage({
      to: "+16266443347",
      from: "+18553381680",
      body: `lex this new listing is here ${linkToSend}`
    }, (err, responseData) => {
      console.log(responseData.body);
    });
  }
};

module.exports = craigslist;
