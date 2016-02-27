var moment = require('moment');
var osmosis = require('osmosis');

var craigslist = {
  queryParams: {
     date: 'time@datetime',
    link: 'a@href',
  },

  query(done) {
    osmosis.get('http://losangeles.craigslist.org/search/hhh').find('span.pl').set(queryParams).data(function(data) {
    if(moment(data.date, 'YYYY-MM-DD HH:mm').isAfter(moment().subtract('40', 'minutes')))
      console.log('new ads', data.link);
      done();
    });
  }
};

