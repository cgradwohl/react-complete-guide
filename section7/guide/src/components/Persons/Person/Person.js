import React, {Component, Fragment} from 'react';
import classes from './Person.css';
import anotherWithClass from '../../../hoc/anotherWithClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    // an obj ref that react gives me.
    // React will handle the object refence when invoked!
    this.inputElRef = React.createRef();
  }

  // this static field must be spelt like this
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputEl.focus();
    this.inputElRef.current.focus();

    // you must reference context now like this!
    console.log(this.context.authed);
  }
  render() {
    console.log('[Person.js] rendering ...')
    return (
      <Aux className={classes.Person}>
        {this.context.authed ? <p>YES! AUTH!</p> : <p>No. Auth.</p>}
          
        {/* mutating state in parent component from a child presentational compnent */}
        <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          // ref={(elReference) => {this.inputEl = elReference}}
          ref={this.inputElRef}
          onChange={this.props.changed} 
          value={this.props.name} />
      </Aux>
    );
  }
}
// const person = props => {
//   console.log('[Person.js] rendering ...')
//   return (
//     <div className={classes.Person}>
//       {/* mutating state in parent component from a child presentational compnent */}
//       <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
//       <p>{props.children}</p>
//       <input type="text" onChange={props.changed} value={props.name} />
//     </div>
//   );
// };

Person.propTypes = {
  clicked: PropTypes.func,
  name:PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default anotherWithClass(Person, classes.Person);
