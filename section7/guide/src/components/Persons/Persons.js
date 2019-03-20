import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Person.js] getDerivedStateFromProps')
  //   return state;
  // }

  // Now this component will only update if 
  // the nextProps(incoming props) are different then the
  // ones we currently have.

  /**
   * REMEMBER THAT OBJECTS AND ARRAYS ARE PASS BY REFERENCE!
   * the comparison below is a comparison of POINTERS!
   * this only works because of the way we are handleing the state
   * cliked event and the change event!! PLEASE SEE nameChangedHandler()
   * and deletePersonHandler() in App.js!!!!
   * There we copy a new object/array with the spread 
   * operator, and pass that new object to this.setState()
   * Therefore a new object with a new pointer is in state!!
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   // if you want to check every prop and determine if this component should update
  //   // then have this component extend PureComponent instead of Component
  //   if(nextProps.persons !== this.props.persons
  //     || nextProps.changed !== this.props.changed
  //     || nextProps.clicked !== this.props.clicked){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Person.js] getSnapshotBeforeUpdate')
    return null;
  }

  componentDidUpdate(){
    console.log('[Person.js] componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Person.js] rendering ...')
    // HERE WE DONT WANT TO PROVIDE CONTEXT
    // WE WANT TO CONSUME CONTEXT :)
    return this.props.persons.map((obj, idx) => {
      return (
        <Person
          key={obj.id}
          click={this.props.clicked.bind(this, idx)}
          name={obj.name}
          age={obj.age}
          changed={this.props.changed.bind(this, obj.id)}
        />
      )
    });
  }
}


// const persons = (props) => {
//   console.log('[Person.js] rendering ...')
//   return props.persons.map((obj, idx) => {
//     return <Person
//       key={obj.id}
//       click={props.clicked.bind(this, idx)}
//       name={obj.name}
//       age={obj.age}
//       changed={props.changed.bind(this, obj.id)} />
//   });
// }


export default Persons;