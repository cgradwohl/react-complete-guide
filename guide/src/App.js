import React, { useState, Component } from "react";
import classes from "./App.css";
import Person from "./Person/Person";
import ErrorBoundry from "./ErrorBoundry/ErrorBoundry";
// useState() is the hook that allows us to use/ manage state in a functional component
// const app = props => {
// the argument to useState() is an object of initial state

// useState() always returns an array with two elements
//    stateArr[0] - initial or current state, updated state 
//    stateArr[1] - function to update the state
// const [personsState, setPersonsState] = useState({
//   persons: [
//     { name: "chris", age: 30 },
//     { name: "patsy", age: 27 },
//     { name: "taco", age: 5 }
//   ],
// });

// it is best practice to use multiple calls to useState to manage 
// different slices of state independently
// Now we cannot accidently override state :)
// const [otherState, setOtherState] = useState('some other initial value')

// console.log(personsState, otherState)

// const switchNameHandler = () => {
// the hooks setState function REPLACES state with whatever you passed to it
// i.e. here will replace otherState property from the state tree!!!!! 
//   setPersonsState({
//     persons: [
//       { name: "CHRISTOPHER", age: 30 },
//       { name: "patsy", age: 27 },
//       { name: "taco", age: 5 }
//     ],
//   })
// }

// return (
//   <div className="App">
//     <h1>hi i am a react app</h1>
//     <h3>{otherState}</h3>
//     <button onClick={switchNameHandler}>Switch Name</button>
//     <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//     <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
//       Patsy Hobbies: rock climbing
//       </Person>
//     <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
//   </div>
// );
// this is ana example of the react api under the hood:
// return React.createElement(
//   'div',
//   { className: 'App' },
//   React.createElement('h1', null, 'hello there!!')
// );
// }

// export default app;

class App extends Component {
  // only available in class react components
  // special state property
  // only changes in props  and/ or state  trigger 
  // React to re-render your components and potentially update the DOM in the browser 
  state = {
    persons: [
      { id: 'aqgQD', name: "chris", age: 30 },
      { id: 'gwovsh98c7y', name: "patsy", age: 27 },
      { id: 'qaciox8z978', name: "taco", age: 5 }
    ],
    otherState: "some other state",
    bool: false
  };
  // this only works because it is an es6 function which has lexical context
  // the owner is the class function object, 
  // therefore the correct 'this' is used implicitly
  switchNameHandler = (newName) => {
    // DONT DO THIS ---> this.state.persons[0].name = 'CHRISTOPHER', use setState()
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: "patsy", age: 27 },
        { name: "taco", age: 5 }
      ]
    })
  }

  deletePersonHandler = (idx) => {
    // THIS IS MUTATING THE STATE!!! 
    // OBJECTS ARE A REFERENCE TYPE SO YOU ARE ACTUALLY MUTATING STATE
    // const persons = this.state.persons;
    // INSTEAD DO THIS :)
    const persons = [...this.state.persons];
    persons.splice(idx, 1);
    this.setState({ persons })
  }

  nameChangedHandler = (id, event) => {
    // get the index or reference to the state 
    const personIdx = this.state.persons.findIndex(p => p.id === id);

    // copying the state key, not mutating it directly
    const person = {
      ...this.state.persons[personIdx]
    }
    // -or-
    // const person = Object.assign({}, this.state.persons[personIdx])

    // update the new value, to be in state
    person.name = event.target.value;

    // copying the state object
    const persons = [...this.state.persons]

    // -or-
    // const persons = this.state.persons.slice()

    // update the new value
    persons[personIdx] = person;

    // set the state with new values
    this.setState({ persons });
  }
  togglePersonHandler = () => {
    const doesShow = this.state.bool;
    this.setState({ bool: !doesShow });
  }
  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.bool) {
      // here we can assign jsx html code into a variable 
      persons = (
        <div>
          {this.state.persons.map((obj, idx) => {
            return <ErrorBoundry key={obj.id}>
              <Person
                click={this.deletePersonHandler.bind(this, idx)}
                name={obj.name}
                age={obj.age}
                // NOTE THAT THE react synthetic event is passed as the 
                // second argument to the handler AFTER obj.id
                changed={this.nameChangedHandler.bind(this, obj.id)} />
            </ErrorBoundry>
          })}
        </div>
      );
      btnClass = classes.Green;
    }
    /**
     * This is a nice way to add a list of classes to a dynamic className property:
     */
    // let classes = ['red', 'bold'].join(' ');
    const assignedClasses = [];
    if (this.state.persons.length <= 2) assignedClasses.push(classes.green);
    if (this.state.persons.length <= 1) assignedClasses.push(classes.bold);
    if (this.state.persons.length == 0) {
      const idx = assignedClasses.findIndex(el => el === 'green');
      assignedClasses[idx] = 'red';
    }
    return (
      <div className={classes.App}>
        <h1>hi i am a react app</h1>
        <h3>{this.state.otherState}</h3>
        <p className={assignedClasses.join(' ')}>This is working</p>
        {/* bind is better and this way is ineffcient: can re render to often!! */}
        <button
          className={btnClass}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}

      </div>
    );
  }
}

export default App;
