import React, {Component} from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {handleInitialData} from "./actions/shared";
import NavBar from "./components/NavBar";
import Questions from "./components/Questions";
import Login from "./components/Login";
import {Route, Switch} from "react-router-dom";
import QuestionView from "./components/QuestionView";
import {RootState} from "./types";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser
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
                    <Route path='/' component={Login}></Route>
                    <Route path='/questions' component={Questions}></Route>
                    <Route path='/question/:id' component={QuestionView}></Route>

                </Switch>
            </div>
        )
    }
}

export default withRouter(connector(App));
