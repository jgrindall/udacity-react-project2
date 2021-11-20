import {Route} from "react-router-dom";
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ProtectedRouteProps} from "../types";
import {RouteComponentProps} from "react-router-dom";
class RedirectComponent extends Component<RouteComponentProps, {}> {
    render() {
        return <Redirect to={
            {
                pathname:"/login",
                state:{
                    "redirect": this.props.location.pathname
                }
            }
        } />;
    }
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        return this.props.isAllowed ?
            (<Route {...this.props}/>)
            :
            <Route {...this.props} component={RedirectComponent}/>;
    }
}
