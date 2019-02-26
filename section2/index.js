// default export
// you can name your import whatever you want since it has a default 
// import prs from './person';
// import person from './person';

// named exports
// you need to define or destructure the methodor object from the module
// import { dude } from './utils';
// import { bro as man } from './utils';

// class
// super(); calls the parents constructor function

// spread and rest
// const filter = (...args) => {
//     console.log(args);
//     return args.filter(el => el === 1);
// }
// const res = filter([1], [2,3,4])
// console.log(res);

// when using spread our new properties take presidenace
// const person = {
//     name: 'patsy'
// };
// const newPerson = {
//     ...person,
//     name: 'Patsy Gradwohl',
//     age: 27
// }
// console.log(newPerson);

// array destructering is defined by ordering
// [a,b] = [1,2];
// console.log(a)
// console.log(b)

// obj destructuring is defined by property name
// {cat} = {cat:'dude', d:'bro'}

// primative types vs reference types

// when primative types(String, Number, Boolean, Null, Undefined) are reassigned the value is actually copied
// const num1 = 1;
// const num2 = num1;
// console.log(num2); 

// when reference types(Object, Array, Function) are reassigned, the pointer is copied not the value
// therefore updateing the pointer will update the origonal object
// const person = {
//     name: 'Patsy'
// }
// const person2 = person;
// person2.name = 'Chris';
// console.log(person.name); // Chris
// console.log(person2.name);// Chris

// to actualt DEEP copy an object and not just the pointer:
// const deep_person1 = Object.assign(person, {});
// const deep_person2 = {
//     ...person
// }
// console.log(deep_person1)
// console.log(deep_person2)



// this

// if 'this' is nested inside a METHOD then is it referenced to global
const regObj = {
    msg: "DUDE BRO",
    friends: ["patsy", "chris", "taco", "jim"],
    talk: function() {
        this.friends.forEach(function(element){
            console.log('arrow func would help here:',this==global)
        });
    },
};
regObj.talk()

/**
 * Here the method is an arrow function so it will not have its own
 * 'this' keyword and therefor arrow should not be used as method
 */
// const arrowObj = {
//     msg: "DUDE BRO",
//     friends: ["patsy", "chris", "taco", "jim"],
//     talk: () => {
//         this.friends.forEach((element) => {
//             console.log(this==global)
//         });
//     },
// };

// here the arrow func helps
const arrowObj = {
    msg: "DUDE BRO",
    friends: ["patsy", "chris", "taco", "jim"],
    talk: function() {
        this.friends.forEach((element) => {
            console.log(this!=global)
        });
    },
};


// According to MDN: “An arrow function expression has a shorter 
// syntax than a function expression and does not have its own 
// this, arguments, super, or new.target. These function expressions 
// are best suited for non-method functions, and they cannot be used 
// as constructors.”
arrowObj.talk(); // undefined

