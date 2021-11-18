import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router-dom";
import {RootState} from "../types";
import {setAuthedUser} from "../actions/authedUser";
import UserIndicator from "./UserIndicator";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        authedUser: state.authedUser,
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    navProp: any
};

type MyState = {

};

class NavBar extends Component<MyProps, MyState> {
    componentDidMount() {

    }
    onLogout(){
       this.props.dispatch(setAuthedUser(null));
    }
    render() {
        return (
            <div className='header'>

                <button className="pure-button pure-button-primary" disabled={!this.props.authedUser}>
                    <Link to={{
                        pathname: '/add'
                    }}>+ New Question</Link>
                </button>
                <button className="pure-button pure-button-primary" disabled={!this.props.authedUser}>
                    <Link to={{
                        pathname: '/leaderboard'
                    }}>Leaderboard</Link>
                </button>
                <button className="pure-button pure-button-primary">
                    <Link to={{
                        pathname: '/questions'
                    }}>Questions</Link>
                </button>

                <UserIndicator></UserIndicator>
            </div>
        )
    }
}

export default withRouter(connector(NavBar));

