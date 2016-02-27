var Promise = require('bluebird');
var osmosis = require("osmosis");
var queryParams = {
   date: 'time@datetime',
  link: 'a@href',
};
var ads = [];



return new Promise ((resolve, reject) => {
  osmosis.get('http://losangeles.craigslist.org/search/hhh').find('span.pl').set(queryParams).then((context, data, next, done) => {
    ads.push(data)
    resolve(ads);
  })
}).then((data) => {
  console.log(ads)
});
