import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router-dom";
import {RootState} from "../types";
import {setAuthedUser} from "../actions/authedUser";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        authedUser:state.authedUser,
        quizUsers:state.quizUsers
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    navProp: any
};

type MyState = {

};

class UserIndicator extends Component<MyProps, MyState> {
    onLogout(){
       this.props.dispatch(setAuthedUser(null));
    }
    render() {
        const user = this.props.authedUser ? this.props.quizUsers[this.props.authedUser] : null;
        const button = user ?
            (
                <div>

                    <img className="avatar avatar-small" src={user.avatarURL}/>
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

