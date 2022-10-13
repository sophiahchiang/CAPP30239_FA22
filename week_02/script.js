let num = 100;
let num1 = 200;

function foo() {
    console.log(num)
}

console.log(num1);

//function we have to call
let anonFunc = function() {
    console.log("hello")
};

//will run immediately when page loads
//can be a named function and call it later
//has to have semicolon before and after
(function() {
    console.log("Hello")
})();


let foo1 = () => console.log(num);

//or 

foo2 = () => console.log(num1);

//objects with key:name pairs i.e.

key = 300

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

//access a property 
console.log(obj1.name);
console.log(obj1["name"])

let str = "Hello " + key + " more text here " + foo;

//use string template literal instead 
let newstr = `Hello ${key} more text here ${foo}`
console.log(newstr) // <-- ASK ABOUT THIS


for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key} : ${value}`);
}

let newVar = document.getElementById("example");
newVar.innerHTML += "Hello world!"