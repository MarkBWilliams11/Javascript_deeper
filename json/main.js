const header = document.querySelector("header");
const section = document.querySelector("section");

/* 
To obatin the JSON we are going to use the api call XMLHttpRequest(aka XHR).
this is very useful javascript object that allows us to make network requests to
retrieve resources  from a server via javascript(images,text,JSON,HTML snippets)meaning that we
can update small sections of content without having to reload the page. this has led to more 
responsive web pages.
*/

//start with store url of the JSON we want
let requestURL =
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

//create a new request by creating a new request object instance from the XMLHttpReques constructor
let request = new XMLHttpRequest();

//now we open the request with open()
request.open("GET", requestURL);
/* This take atleast two parameters
here we used the HTTP method to use when making the network request.in this case GET is fine

the URL make the request to the URL of the JSON fle that we stored
*/

//set the following lines

//so XHR knows that server will be returning JSON and that this should be converted behnd the scences
//into javascript object
// request.responseType = "json"; will we json obj
request.responseType = "text"; // now we're getting a string!

//then we send the request
request.send();

//then we wait for the response to return from the server then dealing with it
request.onload = function () {
  const superHeroesText = request.response; // get the string from the response
  const superHeroes = JSON.parse(superHeroesText); // convert it to an object
  //const superHeroes = request.response; wwhen using json type
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};

//create elements for JSON
function populateHeader(obj) {
  const myH1 = document.createElement("h1");
  myH1.textContent = obj["squadName"];
  header.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent =
    "Hometown: " + obj["homeTown"] + " // Formed: " + obj["formed"];
  header.appendChild(myPara);
}

//show heros JSON
function showHeroes(obj) {
  const heroes = obj["members"];

  for (let i = 0; i < heroes.length; i++) {
    const myArticle = document.createElement("article");
    const myH2 = document.createElement("h2");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    const myPara3 = document.createElement("p");
    const myList = document.createElement("ul");

    myH2.textContent = heroes[i].name;
    myPara1.textContent = "Secret identity: " + heroes[i].secretIdentity;
    myPara2.textContent = "Age: " + heroes[i].age;
    myPara3.textContent = "Superpowers:";

    const superPowers = heroes[i].powers;
    for (let j = 0; j < superPowers.length; j++) {
      const listItem = document.createElement("li");
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
/* 
Note: sometime we may recieve JSON as a string, and need to convert it to an object.
and when we want to send JSON to the network we need to convert it to a string.

pares()- Accepts a json string as paramter and returns the corresponding  javascript object.
stringify()- Accepts an object as a pparamter, and rturns he equivalent JSON string
*/

let myObj = { name: "Chris", age: 38 };
myObj;
let myString = JSON.stringify(myObj);
myString;

// Storing data:
const johnObj = { name: "John", age: 31, city: "New York" };
const myJSON = JSON.stringify(johnObj);
localStorage.setItem("testJSON", myJSON);

// Retrieving data:
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.name;
