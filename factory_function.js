//similar to constructor but instead the function returns the object
const personFactory = (name, age) => {
  const sayHello = () => console.log("Hi");
  return { name, age, sayHello };
};

const mac = personFactory("mac", 27);
console.log(mac.name);

// scope closure
