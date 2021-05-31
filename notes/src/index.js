import _ from "lodash";
import { myName, functionOne } from "./exported";

function component1() {
  const element1 = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element1.innerHTML = _.join(["Hello", "webpack"], " ");

  return element1;
}

document.body.appendChild(component1());

function component2() {
  const element2 = document.createElement("div");

  // use your function!
  element2.innerHTML = myName("Cody");
  return element2;
}

document.body.appendChild(component2());

functionOne();
