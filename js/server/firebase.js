const Firebase = require('firebase');

const firebaseRef = {
  addToDatabase(section, name, number) {
    const firebaseUrl = new Firebase('https://craigslist-notifier.firebaseio.com/listings')
    // const listings = firebaseUrl.child("listings")
    firebaseUrl.push({
      section: section,
      name: name,
      number: number
    })
  }, 
}

export default firebaseRef

// var firebaseRef = new Firebase('https://craigslist-notifier.firebaseio.com/')
//
//
// var listings = firebaseRef.child("listings")
// listings.push({
//   section: "housing",
//   name: "lex",
//   number: "555-555-555"
// });
// firebaseRef.on('value', (snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     console.log(childSnapshot.val())
//   })
// }), (errorObject) => {
//   console.log("The read failed with error ", errorObject.code);
// };
