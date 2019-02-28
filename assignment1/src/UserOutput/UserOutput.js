import React, { Component } from 'react';
import './UserOutput.css';
/**
 * functional implementation
 */
// const userOutput = props => {
//     return (
//         <div className='UserOutput'>
//             <h3>{props.username}</h3>
//             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quam tempore repudiandae magni, eius facere!</p>
//             <p>Quo veritatis maiores reiciendis officia consequuntur sint dolore, porro voluptate, cupiditate facilis quos quasi doloribus.</p>
//         </div>
//     )
// }
// export default userOutput;

/**
 * class implementation
 */
class UserOutput extends Component {
    render() {
        return (
            <div className='UserOutput'>
                <h3>{this.props.username}</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quam tempore repudiandae magni, eius facere!</p>
                <p>Quo veritatis maiores reiciendis officia consequuntur sint dolore, porro voluptate, cupiditate facilis quos quasi doloribus.</p>
            </div>
        );
    }
}
export default UserOutput;
