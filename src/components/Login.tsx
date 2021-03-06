import React, {Component} from 'react'
import {User} from "../types";
import {handleAuthedUser} from "../actions/shared";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";
import LoginItem from "./LoginItem";

const mapStateToProps = (state: RootState) => {
    return {
        users:state.users,
        authedUser: state.authedUser
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps;

class Login extends Component<MyProps, {}> {
    onSelectUser(user:User){
        this.props.dispatch(handleAuthedUser(user.id, ()=>{
            /**
             * login and then redirect
             */
            const state = this.props.location.state as {redirect?: string};
            if(state && state.redirect){
                this.props.history.push(state.redirect);
            }
        }));
    }
    render() {
        if(this.props.authedUser){
            /**
             * Just push to home page
             */
            return <Redirect to={"/"}/>;
        }

        /**
         * show the available users
         */
        const userIds = Object.keys(this.props.users);
        const users = userIds.map( (userId:string) => {
            const user = this.props.users[userId];
            return (
                <LoginItem key={user.id} user={user} onSelectUser={this.onSelectUser.bind(this, user)}/>
            );
        });
        return (
            <div className="login">
                <p className="title">Please login:</p>
                <ul>
                    {users}
                </ul>
            </div>
        );
    }
}

export default withRouter(connector(Login));

