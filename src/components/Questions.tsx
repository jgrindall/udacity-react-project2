import React, {Component} from 'react'
import {Question, QuestionList, QuestionOption} from "../types";
import QuestionSummary from "./QuestionSummary";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";
import QuestionNavigation from "./QuestionNavigation";

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

type Match = {
    params:{
        filter:"answered" | "unanswered"
    }
}

class Questions extends Component<MyProps, MyState> {
    render() {

        const filter = (this.props.match as unknown as Match).params.filter as string;

        const isAnswered = _isAnswered(this.props.authedUser);

        const makeQuestionList = (id:string) => {
            const question = this.props.questions[id];
            return (
                <li key={id}>
                    <div>
                        <QuestionSummary question={question}></QuestionSummary>
                    </div>
                </li>
            );
        };

        const ids:string[] = Object.keys(this.props.questions);

        const filterFn = (filter === "answered" ?  ((question:Question) => isAnswered(question)) :  ((question:Question) => !isAnswered(question)));

        const element = ids
            .filter(id=>{
                const question = this.props.questions[id];
                return filterFn(question);
            })
            .sort((a:string, b:string)=>{
                const timeA = this.props.questions[a]?.timestamp, timeB = this.props.questions[b]?.timestamp;
                return timeA === timeB ? 0 : (timeA < timeB ? -1 : 1);
            })
            .map(makeQuestionList);

        return (

            <div className="questions">
                <QuestionNavigation filter={filter}></QuestionNavigation>
                {element.length >= 1 ? <ul>{element}</ul> : <div className='none'>None found</div>}
            </div>
        )
    }
}

export default withRouter(connector(Questions));