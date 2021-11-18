import {Route} from "react-router-dom";
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ProtectedRouteProps} from "../types";

class RedirectComponent extends Component<{}, {}> {
    render() {
        return <Redirect to={"/login"}/>;
    }
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        return this.props.isAllowed ?
            (<Route {...this.props}/>)
            :
            <Route {...this.props} component={RedirectComponent} />;
    }
}
