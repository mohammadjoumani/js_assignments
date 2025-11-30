/// region Part 01

// 01-
console.log("-------------- Question Number 01 ---------------");

let sum = Number("123") + 7;
console.log(sum);


// 02- 
console.log("-------------- Question Number 02 ---------------");

let inputFalsy = 0;
if (!inputFalsy) {
  console.log("Invalid");
}


// 03-
console.log("-------------- Question Number 03 ---------------");

for(var i = 0;i<= 10;i++) {
    if(i %2 === 0) {
        continue;
    }
    console.log(i);
}


// 04- 
console.log("-------------- Question Number 04 ---------------");

let arrNum = [1, 2, 3, 4, 5];
const evens = arrNum.filter((element) => element % 2 == 0);
console.log(evens);


// 5-
console.log("-------------- Question Number 05 ---------------");

let arr1 =[1, 2, 3];
let arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
console.log(mergedArray);

// 06- 
console.log("-------------- Question Number 06 ---------------");

let numberOfDay = 1
switch(numberOfDay) {
    case 1:
        console.log("Sunday");
        break; 
    case 2:
        console.log("Monday");
        break;    
    case 3:
        console.log("Tuesday");
        break; 
    case 4:
        console.log("Wednesday");
        break;    
    case 5:
        console.log("Thursday");
        break; 
    case 6:
        console.log("Friday");
        break;    
    case 7:
        console.log("Saturday");
        break; 
    default:
        console.log("Invalid index day");
        break
}

//07- Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]

console.log("-------------- Question Number 07 ---------------");

let arrStr = ["a", "ab", "abc"];
let lengths = arrStr.map((e) => e.length);
console.log(lengths);


// 08-
console.log("-------------- Question Number 08 ---------------");

function checkDivisible(input) {
    if(input % 3 == 0 && input %5 == 0){ 
        return "Divisible by both";
    } else {
        return "Not divisible by both";
    }
}

console.log(checkDivisible(15));


//09-
console.log("-------------- Question Number 09 ---------------");

let sqaure = (number) => {
    return number * number;
}
console.log(sqaure(5));

// 10- 
console.log("-------------- Question Number 10 ---------------");

function describePerson({ name, age }) {
  return `${name} is ${age} years old`;
}
var person = { name: 'John', age: 25 };
console.log(describePerson(person));


// 11- 
console.log("-------------- Question Number 11 ---------------");
function sumMultiParameters(...params) {
    let sum = 0;
    params.map((e) => sum+= e);   
    console.log(sum);
}

sumMultiParameters(1, 2, 3, 4, 5);


// 12.
function getPromise() {
    setTimeout(() => {
        // The result will show after 3 seconds
        console.log("-------------- Question Number 12 ---------------");
        console.log("Success");
    }, 3000);
}

getPromise();

// 13-
console.log("-------------- Question Number 13 ---------------");

function findLargest(arr) {
    let largest = arr[0];
    for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  
  return largest;
}

console.log(findLargest([1, 3, 7, 2, 4]));


// 14- 
console.log("-------------- Question Number 14 ---------------");

function getKeys(obj) {
  return Object.keys(obj);
}
var person = { name: "John", age: 30 };
console.log(getKeys(person));


// 15- 
console.log("-------------- Question Number 15 ---------------");

function getArray(str) {
    return str.split(' ');
}

console.log(getArray("The quick brown fox"));


///end region part 01



/************************* Region Part 02****************


01-
for...of
It is a loop on objects like arrays, strings, elc......
You get the value directly.
You can use break, continue, and return.
Works perfectly with async/await.
forEach
It is an array method and takes a callback function with (element, index, array) parameters.
Cannot be stopped using break, continue, or return.
Does not work properly with async/await.

I can use for...of and forEach with any array but, 
if I have await or (break, continue, return) forEach dont support so I use for...of 


02- 
Hosting: Move declarations of variables, funcations to the top of their scope.
Ex: for hosting
console.log(x); // undefined -> declaration hoisted but not initialization
var x = 5;
TDZ: 
The period from start until let or const varble initialized
Ex: for TDZ
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;
console.log(y); // ReferenceError: Cannot access 'y' before initialization
const y = 10
Can use x, y after initialization


03-
== its compare between values 
=== its compare between values and types 


4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)
In JavaScript, the try statement is used to handle errors that may occur during code execution - without stopping the entire program.
The try statement works together with catch.
Sometimes it works with finally.
And sometimes it works with throw.

05- 
Conversion: its happen manually when i converts value from type to another.
EX: Number("123");convert from string to number

Coercion: its happen automatically when js coverts during expressions
Ex: "123" + 7 convert string to number. and result is: 130



*********************** End Region Part 02*****************************/


