/* 
async keyword is what lets the javascript engine know that you are declaring an asynchronous function,
this is required to use await inside any function.

  const yourAsyncFunction = async () => {
    // do something asynchronously and return a promise
    return result;
  }

  //with a loop 

  anArray.forEach(async item => {
   // do something asynchronously for each item in 'anArray'
   // one could also use .map here to return an array of promises to use with 'Promise.all()'
});

//with server data looping
server.getPeople().then(async people => {
  people.forEach(person => {
    // do something asynchronously for each person
  });
});


await tells the javascript to wait for an asynchronous action to finish before continuing the function.

Error handling
.catch() method for handling errors 

asyncFunctionCall().catch(err => {
  console.error(err)
});

*/
