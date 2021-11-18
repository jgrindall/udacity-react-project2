import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
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
        const question:Question = this.props.question;
        let authorName:string = "<Unknown user>", avatar = "/unknown.png";
        const author = this.props.quizUsers[question.author];
        if(author){
            avatar = author.avatarURL;
            authorName = author.name;
        }
        return (
            <div className="question">
                <p>
                    {authorName} asked:
                </p>
                <div className="container">
                    <div className="left">
                        <img className="avatar" src={avatar}/>
                    </div>
                    <div className="right">
                        <p>
                            Would you rather...
                        </p>

                        <span>
                            {question.optionOne.text.split(" ")[0] + "..."}
                        </span>

                        <span>
                            {question.optionOne.text}
                        </span>

                        <span>
                            {question.optionTwo.text}
                        </span>

                        <p>{question.optionOne.votes.length}</p>
                        <p>{question.optionTwo.votes.length}</p>

                        <p>You said</p>
                        <p>{question.optionOne.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>
                        <p>{question.optionTwo.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>

                    </div>
                </div>

                <Link className="link" to={{
                    pathname: '/question/' + question.id
                }}>View Poll</Link>

            </div>
        )
    }
}

export default connector(QuestionSummary)