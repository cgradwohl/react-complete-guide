This is the repo for 'React - The Complete Guide' course on Udemy



1. State
To manipulate state you can extend React.component or you can use useSate hook in a functional component. 

super() is called inside a react component only if it has a constructor. 
The reason why this cannot be allowed before super() is because 'this' 
is uninitialized if super() is not called.

we call super(props) inside the constructor if we have to use this.props


  FROM REACT DOCS : 
    
    If you don’t initialize state and you don’t bind methods, 
    you don’t need to implement a constructor for your React component.

    The constructor for a React component is called before it is mounted. 
    When implementing the constructor for a React.Component subclass, you 
    should call super(props) before any other statement. Otherwise, 
    this.props will be undefined in the constructor, which can lead to bugs.

    Typically, in React constructors are only used for two purposes:

        1. Initializing local state by assigning an object to this.state.
        2. Binding event handler methods to an instance.

2. class properties and methods for events

a. When you define a field that is a function you can use the () => {} syntax which will allow the this keyword to be bound to the encapsulating class. This is called the 'public class fields syntax'. Public class fields syntax will correctly bind callbacks from events. 

QUESTION: What is 'this' bound to in a regular javascript function?
ANSWER: 'this', always references the owner scope of the __function__ that it is in. 'this' does not reference where the function is defined(lexical context), it references where the function is being called(execution context) 
```
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks: function() {
    this.tasks.forEach(function(task) {
      alert(this.name + " wants to " + task); // 'this' references GLOBAL
    });
  }
};
```
Above you can see that 'this' is inside the callback of Array.forEach(). Who is calling this function? 
1. first the bunny object calls bunny.showTasks()
2. Then show tasks reaches for Array.forEach(), which is now in gloabl context, so 'this' is bound to Global/Window! 
So if I change it to an arrow function the it will be executed in the lexical scope and the 'this' reference will bubble to the top, searching for the parent object where it is defined!

When it is inside of an object’s method — the function’s owner is the object. Thus the ‘this’ keyword is bound to the object. Yet when it is inside of a function, either stand alone or within another method, it will always refer to the window/global object.

ANOTHER es5 EXAMPLE:
```
var dude = {
  sound: 'bro!',
  talk: function() {
    console.log(this.sound)
  }
}
dude.talk(); // 'bro!'
var dudeTalk = dude.talk;
dudeTalk(); // undefined
```
Here the call dudeTalk() returns undefined because as soon as we reference a METHOD into a variable and then execute it, the Global/Window object is calling that method reference. But Window/Global does not have a 'sound' property on it, therefore it is undefined. The owner scope of dudeTalk() is global! :) Calling dudeTalk is the same as doing this:
```
var dudeTalk = function() {
  console.log(this.sound)
}
dudeTalk(); //undefined
```

ANOTHER es5 example:
```
var btn = document.getElementById('myDopeAssButton');
btn.addEventListener('click', dude.talk);
```
Again when the button is clicked the 'this' inside of the method dude.talk() will not reference the dude object because the dude object is not who is calling the method. The window object is dispatching the event and then calling dude.talk in the callback. Therefore the window object is the reference to 'this'. to overcome this you can do the following:
```
var btn = document.getElementById('myDopeAssButton');
btn.addEventListener('click', dude.talk.bind(dude));
```



QUESTION: this may not work for referencing the class ?? What is the binding of this in arrow functions? 
ANSWER: In ES6, arrow functions use lexical scoping — ‘this’ refers to it’s current surrounding scope and nothing further. Thus the inner function knew to bind to the inner function only, and not to the object’s method or the object itself.

b. If you use 'method' syntax myMethod(){}, then 'this' will still reference the encapsulating 
class, but if you use 'method' syntax for event handlers then the this keyword will no longer reference the class(similar to how js is executed at runtime) to over come this you have to bind the method in the class constructor to the 'this' keyword. i.e.
```
  constructor() {
    this.myMethod = this.myMethod.bind(this)
  }
```
c. The third AND worst option is too use an arrow function directly in the callback. This can cause react to uneccisarrily re render components so avoid this use.
<button onClick={(e) => this.myHandler(e)}>