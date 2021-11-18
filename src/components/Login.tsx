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
            return <Redirect to={"/questions/unanswered"}/>;
        }

        const ids = Object.keys(this.props.quizUsers);
        const users = ids.map(id => {
            const user = this.props.quizUsers[id];
            return (
                <div className="user" key={user.id}>
                    <img className = "avatar" alt="avatar" src={user.avatarURL}/>
                    <span>{user.name}</span>
                    <button className="pure-button pure-button-primary" onClick={this.onSelectUser.bind(this, user)}>Select</button>
                </div>
            );
        });
        return (
            <div className="login">
                <p className="title">Please login:</p>
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

