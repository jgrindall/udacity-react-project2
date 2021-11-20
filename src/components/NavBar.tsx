import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {RootState} from "../types";
import UserIndicator from "./UserIndicator";

const mapStateToProps = (state: RootState) => {
    return {
        authedUser: state.authedUser,
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps;

class NavBar extends Component<MyProps, {}> {
    render() {
        return (
            <div className='header'>

                <button className="pure-button pure-button-primary">
                    <Link to={{
                        pathname: '/'
                    }}>Home</Link>
                </button>

                <button
                    className="pure-button pure-button-primary"
                    disabled={!this.props.authedUser}>
                    <Link to={{
                        pathname: '/add'
                    }}>+ New Question</Link>
                </button>

                <button
                    className="pure-button pure-button-primary"
                    disabled={!this.props.authedUser}>
                    <Link to={{
                        pathname: '/leaderboard'
                    }}>Leaderboard</Link>
                </button>

                <UserIndicator></UserIndicator>
            </div>
        )
    }
}

export default withRouter(connector(NavBar));

