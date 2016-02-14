 const scrapeCraigslist = ( job, done ) => {
  console.log( "your job is", job.data ) 
  noodle.query({
  url: 'http://losangeles.craigslist.org/lac/apa/5440873214.html',
  type: 'html', 
  selector: 'div.postinginfos', 
  extract: 'text', 
  }).then(( postingDate ) => {
    console.log( postingDate.results[0].results )
    done()
  })
} 

export {scrapeCraigslist}