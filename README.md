This is the repo for 'React - The Complete Guide' course on Udemy

## 1. State, hooks, constructors and super()
To manipulate state you can extend React.component or you can use useSate hook in a functional component. 

super() is called inside a react component only if it has a constructor. 
The reason why 'this' cannot be referenced before super() is because 'this' 
is uninitialized if super() is not called.

we call super(props) inside the constructor if we have to reference this.props.


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

## 2. class properties and methods for events

*** please see A NOTE ON 'this' for a review of 'this' in javascript

a. When you define a field that is a function you can use the () => {} syntax which will allow the this keyword to be bound to the encapsulating class. This is called the 'public class fields syntax'. Public class fields syntax will correctly bind callbacks from events. 

i.e.
class myClass {
  myHandlerField = (e) => {console.log(e.target.value)} 
  render() {}
}


b. If you use 'method' syntax myMethod(){}, then 'this' will still reference the encapsulating 
class, but if you use 'method' syntax for event handlers then the this keyword will no longer reference the class(similar to how js is executed at runtime) to over come this you have to bind the method in the class constructor to the 'this' keyword. i.e.
```
  constructor() {
    this.myMethod = this.myMethod.bind(this)
  }
```


c. The third AND worst option is too use an arrow function directly in the callback. This can cause react to uneccisarrily re render components so avoid this use.
<button onClick={(e) => this.myHandler(e)}>



d. events inside lists
From React docs:
Inside a loop it is common to want to pass an extra parameter to an event handler. For example, if id is the object ID, either of the following would work:

<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively.

In both cases, the e argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.


## 3. Updating State from a dynamic list without redux:
To do this we will need to somehow pass the event and new value from the dynamic list to the event handler from the event callback.
*** see section `2. d.` above to see how this is done :) 
 Next in the event handler public class field function do the following:
a. get a reference to the slice of state using an id or an index
b. use spread operator to create a new value, that is a copy of the state
c. update the new value with the value from the event
d. update state with the new value

## 4. Conditional Rendering
Everything in jsx is javascript :) So we can do stuff like this
```
let dudes = null;
if(bool) {
  dudes = (
    <div>
      {this.state.dudes.map(dude => {
        return <Dude name={dude.name} />
      })}
    </div>
  )
}

You can also do stuff like this:
<div>
  {
    bool == true ? 
    <h1>SHOW ME</h1>
    :null
  }
</div>
```

## A NOTE ON 'this'
QUESTION: What is 'this' bound to in an es5 javascript function?
ANSWER: 'this', always references the owner scope of the __function__ that it is in. 'this' does not reference where the function is defined(lexical context), it references where the function is being called from(execution context) 
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

YET ANOTHER es5 EXAMPLE:
```
var btn = document.getElementById('myDopeAssButton');
btn.addEventListener('click', dude.talk);
```
Again when the button is clicked the 'this' inside of the method dude.talk() will not reference the dude object because the dude object is not who is calling the method. The window object is dispatching the event and then calling dude.talk in the callback. Therefore the window object is the reference to 'this', and window does not have a property sound. To overcome this you can do the following:
```
// the lame way, create some scope
btn.addEventListener('click', function() {
  dude.talk();
});
// Now the anonymous function will instantiate the dude object and then call it in scope, so 'this' will reference the dude object.
```

```
// the nifty way!
var btn = document.getElementById('myDopeAssButton');
btn.addEventListener('click', dude.talk.bind(dude));
```

QUESTION: this may not work for referencing the class ?? What is the binding of this in arrow functions? 

ANSWER: In ES6, arrow functions use lexical scoping — ‘this’ refers to it’s current surrounding scope and nothing further. Thus the inner function knew to bind to the inner function only, and not to the object’s method or the object itself.

## 5. Lifecycle Methods - Creation
1. constructor(props) - call super(props), initialize state, no side effects
2. static getDerivedStateFromProps(props, state) - sync state, no side effects
3. render() - prepare and structure jsx, no side effects
4. Render Child Components 
[Deprecated] componentWillMount()
5. *componentDidMount() - side effects OK, DO NOT update state.
6. componentWillUnmount() - gets executed (when implemented) right before a Component is removed from the DOM, used for clean up

## 6. Lifecycle Methods - Update
1. getDerivedStateFromProps(props, state) - sync state to props, no side effects, OLD WAY, NIECHE
[Deprecated] componentWillRecieveProps(props)
2. *shouldComponentUpdate(nextProps, nextState) - decide whether to continue or not, no side effects
  - this is SO important!
  - here we can prevent other components from updateing when needed.
  - ALWAYS ALWAYS ALWAYS UPDATE STATE WITH A NEW COPY OF THE OBJECT/ARRAY
3. render() - prepare and structure jsx, no side effects
4. Update Child Component Props
5. getSnapshotBeforeUpdate(prevProps, prevState) - last minute DOM operations, no side effects, NIECHE
[Deprecated] componentWillUpdate()
6. *componentDidUpdate(prevProps, prevState, snapshot) - side effects OK, DO NOT update state, which would trigger re-render 
7. componentWillUnmount() - gets executed (when implemented) right before a Component is removed from the DOM, used for cleanup

## 7. Functional Hooks
1. useState((state, stateHandler) => {}); - allows you to access state and setState().
2. useEffects(() => {}, []) - Runs every render cycle (creation or update cycle), componentDidMount() and ComponentDidUpdate() combined
    a. nothiing - runs on every update/ render cycle
    b. [] - useEffect() will run when the component is destroyed
    c. [dep1, dep2, ...] - will run when only when dep1, dep2, ... has changed
    d. return () => {} - runs AFTER every render cycle

example:
```
// Runs every render cycle (creation or )
  // componentDidMount() and ComponentDidUpdate() combined
  useEffect(() => {
    console.log('[Cockpit.js] useEffect(), happens every render cycle');
    // this code runs when component did mount
    const timer = setTimeout(() => {
      alert('DUDEBRO');
    }, 1000);

    // this code runs when dep un mounts based on the dep args list you pass
    return () => {
      clearTimeout(timer);
      // this runs for the last time
      console.log('[Cockpit.js] Cleanup work');
    }
    // you can pass an array as a second arg 
    // to useEffects which will tell it to 
    // run only when that dependency/props has changed.
    // pass empty array to only runs the first time!
  }, []);
```
## 8. React.memo(funcComponent)
This is wraps the functional component and only renders/update the component is a prop changed!

## 9. HOC Components
- used to return props.children which is anything/everthing in side the tags of the parent component.
- with an HOC i.e. Aux.js or React.Fragment, you do not have to return one parent element in th renders return, you can wrap you elements in Aux (the HOC) instead. :) 
- can be used to pass in classes as a prop
- can be used for Error Handling 
- there are two types of HOC, 
  1. a react func component that returns jsx 
      - use this for structureing html, classes etc
  2. a reg js func that returns a react func component
      - use this for error handleing, analystics data etc

## 10. Passing unknown props to a higher order components!!!!!!
- use the spread operator!!! inside the dyanmic space syntax {}
`<WrappedComponent {...props} />`

- this will remove all key, vals from the props object {}, and assign them as props!!

## 11. Update State the right way
- Always use this to update state that depends on previous state,
and never reference this.state
this.setState((prevState, props) => {
  return {

  };
}) 
```
    // set the state with new values,
    // THIS IS JUST WRONG!
    // setState does not automatically update state immediately,
    // the state update happens when available resources become 
    // available
    // Therefore you shoule never use this.state. inside of setState()
    // this.setState({ 
    //   persons,
    //   changedCounter: this.state.changedCounter + 1
    // });

    // use this to update state with prev state :)
    this.setState((prevState, props) => {
      return { 
        persons,
        changedCounter: prevState.changedCounter + 1
      };
    });
```

## 12. How to pass props! PropType!
propstypes define the data type of props!

## 13. Refs
There a few different ways you can use refs:
1.  
