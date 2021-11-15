import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
class NavBar extends Component<{ dispatch: any, tweetIds: any[] }> {
    componentDidMount() {

    }
    onLogout(){
        this.props.dispatch(setAuthedUser(null));
    }
    render() {
        return (
            <div className='header'>

                <button className="pure-button pure-button-primary">
                    <Link to={{
                        pathname: '/'
                    }}>Home</Link>
                </button>


                <button className="pure-button pure-button-primary">
                    <Link to={{
                        pathname: '/add'
                    }}>+ New Question</Link>
                </button>

                <button className="pure-button pure-button-primary">
                    <Link to={{
                        pathname: '/dashboard'
                    }}>See all</Link>
                </button>

                <button
                    onClick={this.onLogout.bind(this)}
                    className="pure-button pure-button-primary">
                        Logout
                </button>

            </div>
        )
    }
}

function mapStateToProps(state: { tweets: any }) {
    return {
        tweetIds: Object.keys(state.tweets)
    }
}

export default connect(mapStateToProps)(NavBar);
