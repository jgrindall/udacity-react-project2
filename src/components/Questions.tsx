import React, {Component} from 'react'
import {Question, RootState, QuestionFilter} from "../types";
import QuestionSummary from "./QuestionSummary";
import {withRouter, RouteComponentProps} from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import QuestionNavigation from "./QuestionNavigation";
import _ from "underscore";

const _isAnswered = (user:any) => (question:Question):boolean => {
    if(!user){
        return false;
    }
    return question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user);
};

const mapStateToProps = (state: RootState) => {
    return {
        authedUser: state.authedUser,
        questions:state.questions
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {};

class Questions extends Component<MyProps, {}> {
    render() {
        const params = this.props.match?.params as unknown as {filter: QuestionFilter};
        const filter = params.filter || QuestionFilter.UNANSWERED;
        const isAnswered = _isAnswered(this.props.authedUser);

        const groups:Record<QuestionFilter, Question[]> = _.groupBy(Object.values(this.props.questions), (question: Question)=>{
            return isAnswered(question) ? QuestionFilter.ANSWERED : QuestionFilter.UNANSWERED;
        }) as Record<QuestionFilter, Question[]>;

        const elements = (groups[filter] || [])
            .sort((questionA:Question, questionB:Question)=>{
                const timeA = questionA?.timestamp, timeB = questionB?.timestamp;
                return timeA === timeB ? 0 : (timeA > timeB ? -1 : 1);
            })
            .map((question:Question)=>
                <li key={question.id}>
                    <div>
                        <QuestionSummary question={question}></QuestionSummary>
                    </div>
                </li>
            );

        return (

            <div className="questions">
                <QuestionNavigation filter={filter} numUnanswered={groups.unanswered ? groups.unanswered.length : 0} numAnswered={groups.answered ? groups.answered.length : 0}/>
                {
                    elements.length >= 1
                        ?
                        <ul>
                            {elements}
                        </ul>
                        :
                        <p className='center'>
                            None found
                        </p>
                }
            </div>
        )
    }
}

export default withRouter(connector(Questions));