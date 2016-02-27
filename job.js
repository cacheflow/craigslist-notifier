import {createQueue} from 'kue'
const noodle = require('noodlejs');
import scrapeCraigslist from './utils/api.js'


const create = () => {
  let job = jobs.create('craigslist', {
    desc: "scraping craigslist"
  });

  job.on('complete', () => console.log( 'job complete' ));
  job.on('failed', () => console.log( 'job failed' ))
  job.on('progress', ( progress ) => console.log( `current progress is %complete` ))

  job.save()
  setTimeout( create, 4100 )
}

create()

jobs.process('craigslist', 1, ( job, done ) => console.log( job, done ))
