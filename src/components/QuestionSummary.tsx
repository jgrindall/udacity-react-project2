import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {RootState, Question} from "../types";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        authedUser: state.authedUser,
        quizUsers:state.quizUsers
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    question: Question
};

type MyState = {

};

class QuestionSummary extends Component<MyProps, MyState> {
    render() {
        return (
            <div>
                <span>
                    {this.props.question.optionOne.text}
                </span>
                <span>
                    {this.props.question.optionTwo.text}
                </span>
            </div>
        )
    }
}

export default connector(QuestionSummary)