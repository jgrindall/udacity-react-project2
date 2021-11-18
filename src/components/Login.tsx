import React, {Component} from 'react'
import {User, UserList} from "../types";
import {setAuthedUser} from "../actions/authedUser";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        quizUsers:state.quizUsers,
        authedUser: state.authedUser
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    loginProp: any
};

type MyState = {

};

class Login extends Component<MyProps, MyState> {
    onSelectUser(user:User){
        this.props.dispatch(setAuthedUser(user.id));
    }
    render() {

        if(this.props.authedUser){
            return <Redirect to={"/questions"}/>;
        }

        const ids = Object.keys(this.props.quizUsers);
        const users = ids.map(id => {
            const user = this.props.quizUsers[id];
            return (
                <span key={user.id} onClick={this.onSelectUser.bind(this, user)}>
                    <img alt="avatar" src={user.avatarURL}/>
                    {user.name}.
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
        return (
            <div>Login</div>
        );
    }
}

export default withRouter(connector(Login));

