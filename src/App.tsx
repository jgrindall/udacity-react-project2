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
import {RootState} from "./types";
import {ProtectedRoute} from "./utils/routes";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        authedUser: state.authedUser
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    appProp: any
};

type MyState = {

};

class App extends Component<MyProps, MyState> {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Switch>
                    <ProtectedRoute exact
                            path='/question/:id'
                            isAllowed={!!this.props.authedUser}
                            component={QuestionView}>
                    </ProtectedRoute>
                    <Route exact
                           path='/questions'
                           component={Questions}>
                    </Route>
                    <ProtectedRoute exact
                           path='/add'
                           isAllowed={!!this.props.authedUser}
                           component={AddQuestion}>
                    </ProtectedRoute>
                    <ProtectedRoute exact
                           path='/leaderboard'
                           isAllowed={!!this.props.authedUser}
                           component={AddQuestion}>
                    </ProtectedRoute>
                    <Route exact
                           path='/login'
                           component={Login}>
                    </Route>
                    <Route exact
                           path='/'
                           component={Login}>
                    </Route>

                </Switch>
            </div>
        )
    }
}

export default withRouter(connector(App));

