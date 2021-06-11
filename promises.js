/* 
Promises is an object or function with a "then" method whose 
behavior conforms to this specification

created with the new keyword and provides resolve and reject functions to the provded callback

Note: should only be used for legacy async task like setTimeout or XMLHttprequest

*/
// basic usage of Promise

/*
var p = new Promise(function(resolve, reject) {
	
	// Do an async task async task and then...

	if(good condition ) {
		//resolve('Success!');
	}
	else {
	//	reject('Failure!');
	}
});

p.then(function(result) { 
	//do something with the result 
}).catch(function() {
//	error :( 
}).finally(function() {
   // executes regardless or success for failure 
});*/

//example for getting the url to use promise with XMLHttpRequest
function get(url) {
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open("GET", url);

    req.onload = function () {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

// Use it!
get("story.json").then(
  function (response) {
    console.log("Success!", response);
  },
  function (error) {
    console.error("Failed!", error);
  }
);

//then- method which allows us react to promise. receives the result given to to resolve()call
//it can also be chained

new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    resolve(10);
  }, 3000);
})
  .then(function (num) {
    console.log("first then: ", num);
    return num * 2;
  })
  .then(function (num) {
    console.log("second then: ", num);
    return num * 2;
  })
  .then(function (num) {
    console.log("last then: ", num);
  });

// From the console:
// first then:  10
// second then:  20
// last then:  40

// the catch callback is executes when the promise is rejected

new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    reject("Done!");
    /* 
    What you provide to the reject method is up to you.
    A frequent pattern is sending an Error to the catch
    reject(Error('Data could not be found'));
    */
  }, 3000);
})
  .then(function (e) {
    console.log("done", e);
  })
  .catch(function (e) {
    console.log("catch: ", e);
  });

// From the console:
// 'catch: Done!'

//Finally returns regardless of success or failure
new Promise((resolve, reject) => {
  reject("Nope");
})
  .then(() => {
    console.log("success");
  })
  .catch(() => {
    console.log("fail");
  })
  .finally((res) => {
    console.log("finally");
  });

/* 
Promise.all method taakes an array of promises and fires 
one callback once they are all resolved 
*/
/*Promise.all([promise1, promise2])
  .then(function (results) {
    // Both promises resolved
  })
  .catch(function (error) {
    // One or more promises was rejected
  });
  
  or firing off multiple AJAX request at once

var request1 = fetch('/users.json');
var request2 = fetch('/articles.json');

Promise.all([request1, request2]).then(function(results) {
	// Both promises done!
});
  
  */
//if any promise is rejected the catch fires for the first rejection
var req1 = new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    resolve("First!");
  }, 4000);
});
var req2 = new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    reject("Second!");
  }, 3000);
});
Promise.all([req1, req2])
  .then(function (results) {
    console.log("Then: ", results);
  })
  .catch(function (err) {
    console.log("Catch: ", err);
  });

// From the console:
// Catch: Second!

//Promise.race triggers as soon as any promise in the array is resolved or rejected
var req3 = new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    resolve("Third!");
  }, 8000);
});
var req4 = new Promise(function (resolve, reject) {
  // A mock async action using setTimeout
  setTimeout(function () {
    resolve("Fourth!");
  }, 3000);
});
Promise.race([req3, req4])
  .then(function (three) {
    console.log("Then: ", three);
  })
  .catch(function (three, four) {
    console.log("Catch: ", three);
  });

// From the console:
// Then: Second!
