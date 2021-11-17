import React, {Component} from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        quizUsers:state.quizUsers
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    questionProp:any
};

type MyState = {

};

class QuestionView extends Component<MyProps, MyState> {
    render() {
        debugger;
        return (
            <div>
                <span>{"b"}</span>
                <span>{"a"}</span>
            </div>
        )
    }
}

export default withRouter(connector(QuestionView));