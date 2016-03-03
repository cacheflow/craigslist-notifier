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
    if(this.site.includes('/hhh')) {
      this.site = this.site.concat('?sort=date&sale_date=', moment().format('YYYY MM DD').replace(/\s+/g, '-'));
    };
    console.log("your url is", this.site);
    return new Promise ((resolve, reject) => {
      osmosis.get(this.site).find('span.pl').set(this.queryParams).then((context, data, next, done) => {
        this.craigslistAds.push(data);
        resolve(this.craigslistAds);
      })
    }).then(() => {
      this.checkForNewAds(finished);
    });
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
     console.log(linkToSend);
   }
   else {
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
