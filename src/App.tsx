import React, {Component} from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {handleInitialData} from "./actions/shared";
import NavBar from "./components/NavBar";
import Questions from "./components/Questions";
import AddQuestion from "./components/AddQuestion";
import Login from "./components/Login";
import {Route, Switch} from "react-router-dom";
import QuestionView from "./components/QuestionView";
import Leaderboard from "./components/Leaderboard";
import {RootState} from "./types";
import {ProtectedRoute} from "./utils/routes";

const mapStateToProps = (state: RootState) => {
    return {
        loading: Object.keys(state.questions).length === 0,
        authedUser: state.authedUser
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps;

class App extends Component<MyProps, {}> {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        const page = this.props.loading
            ?
            (
                <p className="center">
                    Loading, please wait
                </p>
            )
            :
            (
                <Switch>
                    <ProtectedRoute
                        exact
                        path='/question/:id'
                        isAllowed={!!this.props.authedUser}
                        component={QuestionView}
                    >
                    </ProtectedRoute>

                    <Route
                        path='/questions/:filter'
                        component={Questions}
                    >
                    </Route>

                    <ProtectedRoute
                        exact
                        path='/add'
                        isAllowed={!!this.props.authedUser}
                        component={AddQuestion}
                    >
                    </ProtectedRoute>

                    <ProtectedRoute
                        exact
                        path='/leaderboard'
                        isAllowed={!!this.props.authedUser}
                        component={Leaderboard}
                    >
                    </ProtectedRoute>

                    <Route
                        exact
                        path='/login'
                        component={Login}
                    >
                    </Route>

                    <Route
                        exact
                        path='/'
                        component={Questions}
                    >
                    </Route>
                </Switch>
            );


        return (
            <div>
                <NavBar></NavBar>
                <div id="page">
                    {page}
                </div>
            </div>
        )
    }
}

export default withRouter(connector(App));

