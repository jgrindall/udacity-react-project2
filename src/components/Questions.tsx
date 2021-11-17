import React, {Component} from 'react'
import {Question, QuestionList, QuestionOption} from "../types";
import QuestionSummary from "./QuestionSummary";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";

const _isAnswered = (user:any) => (question:Question):boolean => {
    if(!user){
        return false;
    }
    return question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user);
};

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        authedUser: state.authedUser,
        quizUsers:state.quizUsers,
        questions:state.questions
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    questionsProp: any
};

type MyState = {

};

class Questions extends Component<MyProps, MyState> {
    render() {
        const isAnswered = _isAnswered(this.props.authedUser);

        const makeQuestionList = (id:string) => {
            const question = this.props.questions[id];
            return (
                <li key={id}>
                    <QuestionSummary question={question}></QuestionSummary>
                </li>
            );
        };

        const ids:string[] = Object.keys(this.props.questions);

        const questionsAnswered = ids
            .filter(id=>{
                const question = this.props.questions[id];
                return isAnswered(question);
            })
            .map(makeQuestionList);


        const questionsUnAnswered = ids
            .filter(id=>{
                const question = this.props.questions[id];
                return !isAnswered(question);
            })
            .map(makeQuestionList);


        return (
            <div>
                <span>Questions Ans:</span>
                <ul>
                    {questionsAnswered}
                </ul>
                <span>Questions Unans:</span>
                <ul>
                    {questionsUnAnswered}
                </ul>
            </div>
        )
    }
}

export default withRouter(connector(Questions));