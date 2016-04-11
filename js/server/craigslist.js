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
     var randomAd = newAds[Math.floor(Math.random() & newAds.length)];
     var craigslistAd = this.craigslistRegex.exec(this.site);
     var linkToSend = `http://${jobData.city}.craigslist.com${randomAd}`;
     console.log(linkToSend, jobData)
     this.sendTextMessage(linkToSend, jobData, finished)
   }
   else {
     console.log("nothing here");
     finished();
     return;
   }
  },

  sendTextMessage(linkToSend, jobData, finished) {
    twilio.sendMessage({
      to: `+1${jobData.number}`,
      from: "+18553381680",
      body: `${jobData.name} this new listing is here ${linkToSend}`
    }, (err, responseData) => {
      if(!err) {
        console.log(responseData);
      }
      else {
        console.log(err)
      }
    });
    finished();
  }
};

module.exports = craigslist;
