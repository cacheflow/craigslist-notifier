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
  site: "https://losangeles.craigslist.org/search/hhh?sort=date&sale_date=2016-03-02",
  craigslistAds: [],
  query(finished) {
    console.log("calling query");
    var hourAgo = moment().subtract('60', 'minutes');
    // var kueDone = finished;
    return new Promise ((resolve, reject) => {
      osmosis.get(this.site).find('span.pl').set(this.queryParams).then((context, data, next, done) => {
        this.craigslistAds.push(data)
        resolve(this.craigslistAds)
      })
    }).then(() => {
      this.checkForNewAds(finished);
    });
  },

  checkForNewAds(finished) {
    var anHourAgo = moment().subtract({'minutes': 100});
    var newAds = [];
    this.craigslistAds.map((currentValue, index, array) => {
     if(moment(currentValue.date, 'YYYY-MM-DD HH:mm').isAfter(anHourAgo)) {
      newAds.push(currentValue.link);
      console.log("your length is ", newAds.length)
     }
     else {
       console.log("nothing");
     }
   });
   if(newAds.length > 0) {
     var randomAd = newAds[Math.floor(Math.random() & newAds.length)];
     var craigslistAd = this.craigslistRegex.exec(this.site)
     var linkToSend = "http://" + craigslistAd[2] + ".craigslist.com" + randomAd;
     finished()
   }
   else {
     finished()
   }
  },

  finishThisCrap() {
    console.log("calling finished");
  },

  sendTextMessage(linkToSend, finished) {
    twilio.sendMessage({
      to: "+16266443347",
      from: "+18553381680",
      body: `lex this new listing is here ${linkToSend}`
    }, (err, responseData) => {
      console.log(responseData.body);
      finished()
    });
  }
};

module.exports = craigslist;
