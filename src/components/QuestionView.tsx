import React, {Component} from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import {RootState} from "../types";
import QuestionSubmission from "./QuestionSubmission";

const mapStateToProps = (state: RootState) => {
    return {
        questions:state.questions
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps;

class QuestionView extends Component<MyProps, {}> {
    render() {
        const params = this.props.match?.params as unknown as {id: string};
        const id = params.id;
        const question = this.props.questions[id];
        let el;
        if(question){
            el = (
                <div className="questionView">
                    <QuestionSubmission question={question}></QuestionSubmission>
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