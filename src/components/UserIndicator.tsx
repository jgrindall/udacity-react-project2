import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router-dom";
import {RootState} from "../types";
import {handleAuthedUser} from "../actions/shared";
import Avatar from "./Avatar";

const mapStateToProps = (state: RootState) => {
    return {
        authedUser:state.authedUser,
        users:state.users
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps;

class UserIndicator extends Component<MyProps, {}> {
    onLogout(){
       this.props.dispatch(handleAuthedUser(null));
       this.props.history.push('/login');
    }
    render() {
        const user = this.props.authedUser ? this.props.users[this.props.authedUser] : null;
        const button = user ?
            (
                <div>
                    <Avatar user={user} size={"small"}/>
                    <span>
                        {user.name}
                    </span>
                    <button
                        onClick={this.onLogout.bind(this)}
                        className="pure-button pure-button-primary"
                    >
                    Logout
                    </button>
                </div>
            )
            :
            (
                <div>
                    <span>
                        You are not logged in
                    </span>
                    <Link to={{
                        pathname: '/login'
                    }}>Login</Link>
                </div>
            );
        return (
            <div className='user'>
                {button}
            </div>
        );
    }
}

export default withRouter(connector(UserIndicator));

