import React, {Component} from 'react'
import {connect} from "react-redux";
import {User, UserList} from "../types";
import {setAuthedUser} from "../actions/authedUser";


class Login extends Component<{ dispatch: any, quizUsers: UserList }> {
    onSelectUser(user:User){
        this.props.dispatch(setAuthedUser(user.id));
    }
    render() {
        const ids = Object.keys(this.props.quizUsers);
        const users = ids.map(id => {
            const user = this.props.quizUsers[id];
            return (
                <span onClick={this.onSelectUser.bind(this, user)}>
                    <img src={user.avatarURL}/>
                    {user.name}
                </span>
            );
        });
        return (
            <div>
                <span>Choose a user:</span>
                <ul>
                    {users}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state: { quizUsers: UserList }) {
    return {
        quizUsers: state.quizUsers
    }
}

export default connect(mapStateToProps)(Login);