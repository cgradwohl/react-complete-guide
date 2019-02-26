import React, { useState } from "react";
import "./App.css";
import Person from "./Person/Person";

// useState is th ehook that allows us to use/ manage state in a functional component
const app = props => {
  // the argument to useState() is an object of initial state

  // useState() always returns an array with two elements
  //    stateArr[0] - current state, updated state 
  //    stateArr[1] - function to update the state
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "chris", age: 30 },
      { name: "patsy", age: 27 },
      { name: "taco", age: 5 }
    ],
    otherState: 'some other initial value'
  });

  console.log(personsState)

  const switchNameHandler = () => {
    // the hooks setState function REPLACES state with whatever you passed to it
    // i.e. here will replace otherState property from the state tree!!!!! 
    setPersonsState({
      persons: [
        { name: "CHRISTOPHER", age: 30 },
        { name: "patsy", age: 27 },
        { name: "taco", age: 5 }
      ],
      // need to manually add all other state !!!!
    })
  }

  return (
    <div className="App">
      <h1>hi i am a react app</h1>
      <h3>{personsState.otherState}</h3>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
        Patsy Hobbies: rock climbing
        </Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
  // this is ana example of the react api under the hood:
  // return React.createElement(
  //   'div',
  //   { className: 'App' },
  //   React.createElement('h1', null, 'hello there!!')
  // );
}

export default app;

// class App extends Component {
//   // only available in class react components
//   // special state property
//   // only changes in props  and/ or state  trigger 
//   // React to re-render your components and potentially update the DOM in the browser 
//   state = {
//     persons: [
//       { name: "chris", age: 30 },
//       { name: "patsy", age: 27 },
//       { name: "taco", age: 5 }
//     ]
//   };
//   // this only works because if es6 function
//   // the owner is the class function object, 
//   // therefore the correct this is used implicitly
//   switchNameHandler = () => {
//     // DONT DO THIS ---> this.state.persons[0].name = 'CHRISTOPHER'
//     this.setState({
//       persons: [
//         { name: "CHRISTOPHER", age: 30 },
//         { name: "patsy", age: 27 },
//         { name: "taco", age: 5 }
//       ]
//     })
//   }
//   // method syntax
//   switchNameHandler2() {
//     console.log('hello')
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>hi i am a react app</h1>
//         <button onClick={this.switchNameHandler}>Switch Name</button>
//         <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
//         <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>
//           Patsy Hobbies: rock climbing
//         </Person>
//         <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
//       </div>
//     );
//     // this is ana example of the react api under the hood:
//     // return React.createElement(
//     //   'div',
//     //   { className: 'App' },
//     //   React.createElement('h1', null, 'hello there!!')
//     // );
//   }
// }

// export default App;
