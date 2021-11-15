import React, {Component} from 'react'
import {connect} from "react-redux";
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Login from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

class App extends Component<{ dispatch: any, loading: any }> {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const add = <Dashboard></Dashboard>;
        const login =  <Login></Login>;
        const dashboard = <Dashboard></Dashboard>;
        return (
            <BrowserRouter>
                <div>
                    <NavBar></NavBar>
                    <Routes>
                        <Route path='/' element={login}></Route>
                        <Route path='/dashboard' element={dashboard}></Route>
                        <Route path='/add' element={add}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        loading: !state.authedUser
    }
}

export default connect(mapStateToProps)(App);
