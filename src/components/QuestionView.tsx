import React, {Component} from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";
import QuestionSummary from "./QuestionSummary";

const mapStateToProps = (state: RootState) => {
    return {
        loading: !state.authedUser,
        quizUsers:state.quizUsers,
        questions:state.questions
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    questionProp:any
};

type MyState = {

};

type Match = {
    params:{
        id:string
    }
}

class QuestionView extends Component<MyProps, MyState> {
    render() {
        const id = (this.props.match as unknown as Match).params.id as string;
        const question = this.props.questions[id];

        let el;

        if(question){
            el = (
                <div>
                    <QuestionSummary question={question}></QuestionSummary>
                </div>
            );
        }
        else{
            el =  (
                <div>
                    Not found
                </div>
            );
        }

        return (
            <div>
                {el}
            </div>
        );
    }
}

export default withRouter(connector(QuestionView));