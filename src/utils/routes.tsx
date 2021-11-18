import {Route} from "react-router-dom";
import React from "react";
import {RouteProps, Redirect} from "react-router-dom";
import {ProtectedRouteProps} from "../types";

class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!this.props.isAuthenticated) {
            redirectPath = this.props.authenticationPath;
        }
        const redirect = <Redirect to="/somewhere/else" />;

        /*if (redirectPath) {
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        }
        else {
            return <Route {...this.props}/>;
        }*/
    }
}

export default ProtectedRoute;