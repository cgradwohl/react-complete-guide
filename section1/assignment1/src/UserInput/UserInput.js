import React, { Component } from 'react';

/** 
 * functional implementation
 */
// const userInput = props => {
//     const styles = {
//         width: '60%',
//         margin: '16px auto',
//         padding: '16px'
//     }
//     return (
//         <input style={styles} type="text" onChange={props.usernameHandler} placeholder={props.username} />
//     )
// }
// export default userInput;


/**
 * class implementation
 */
class UserInput extends Component {
    constructor(props) {
        // super() is called inside a react component only if it has a constructor. 
        // The reason why this cannot be allowed before super() is because 'this' 
        // is uninitialized if super() is not called.

        //we call super(props) inside the constructor if we have to use this.props

        /**
         * FROM REACT DOCS : 
            
            If you don’t initialize state and you don’t bind methods, 
            you don’t need to implement a constructor for your React component.

            The constructor for a React component is called before it is mounted. 
            When implementing the constructor for a React.Component subclass, you 
            should call super(props) before any other statement. Otherwise, 
            this.props will be undefined in the constructor, which can lead to bugs.

            Typically, in React constructors are only used for two purposes:

                1. Initializing local state by assigning an object to this.state.
                2. Binding event handler methods to an instance.
         */
        super();
        this.state = { 'key': 'value' };

        this.styles = {
            width: '60%',
            margin: '16px auto',
            padding: '16px'
        }
    }
    // styles = {
    //     width: '60%',
    //     margin: '16px auto',
    //     padding: '16px'
    // }
    render() {
        return (
            <input style={this.styles} type="text" onChange={this.props.usernameHandler} value={this.props.username} />
        );
    }
}
export default UserInput;