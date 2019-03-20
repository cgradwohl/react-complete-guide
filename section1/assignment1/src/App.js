import React, { Component, useState } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';
class App extends Component {
  state = {
    username: 'dudbro123'
  }
  usernameHandler = e => {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    return (
      <div className="App">
        <UserInput username={this.state.username} usernameHandler={this.usernameHandler} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
      </div>
    );
  }
}

// const app = props => {
//   const [usernameState, setUsernameState] = useState(
//     {
//       username: 'dudebro123'
//     }
//   );
//   const usernameHandler = e => {
//     setUsernameState({ username: e.target.value })
//     console.log(e.target.value);
//   }
//   return (
//     <div className="App">
//       <UserInput username={usernameState.username} usernameHandler={usernameHandler} />
//       <UserOutput username={usernameState.username} />
//       <UserOutput username={usernameState.username} />
//       <UserOutput username={usernameState.username} />
//     </div>
//   );
// }


export default App;
