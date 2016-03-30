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
  site: "https://losangeles.craigslist.org/search/hhh",
  craigslistAds: [],
  query(finished) {
    return new Promise ((resolve, reject) => {
      osmosis.get(this.queryParams()).find('span.pl').set(this.queryParams).then((context, data, next, done) => {
        this.craigslistAds.push(data);
        resolve(this.craigslistAds);
      })
    }).then(() => {
      this.checkForNewAds(finished);
    });
  },
  queryParams() {
    var currentDate = moment().format('YYYY MM DD').replace(/\s+/g, '-');
    var mostRecentAdQuery = currentDate.concat('?sort=date&sale_date=');
    var sortQuery = '?sort=date&sale_date=';
    var sortQueryWithDate = sortQuery.concat(currentDate);
      if(!this.site.includes(sortQueryWithDate)) {
        this.site = this.site.concat(sortQueryWithDate);
        return this.site;
      }
      else {
        return this.site;
      }
  },

  checkForNewAds(finished) {
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
     var randomAd = newAds[Math.floor(Math.random() & newAds.length)];
     var craigslistAd = this.craigslistRegex.exec(this.site);
     var linkToSend = "http://" + craigslistAd[2] + ".craigslist.com" + randomAd;
     this.sendTextMessage(linkToSend, finished);
   }
   else {
     console.log("nothing here");
     finished();
     return;
   }
  },

  sendTextMessage(linkToSend, finished) {
    twilio.sendMessage({
      to: "+16266443347",
      from: "+18553381680",
      body: `lex this new listing is here ${linkToSend}`
    }, (err, responseData) => {
      if(!err) {
        console.log(responseData);
      }
    });
    finished();
  }
};

module.exports = craigslist;
