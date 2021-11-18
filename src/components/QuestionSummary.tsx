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
        let authorName = "<Unknown user>", avatar = "/unknown.png";
        const author = this.props.quizUsers[this.props.question.author];
        if(author){
            avatar = author.avatarURL;
            authorName = author.name;
        }
        return (
            <div>
                <p>
                    Would you rather...
                </p>
                <span>
                    {authorName}
                </span>
                <img src={avatar}/>
                <span>
                    {this.props.question.optionOne.text.split(" ")[0] + "..."}
                </span>
                <span>
                    {this.props.question.optionOne.text}
                </span>
                <span>
                    {this.props.question.optionTwo.text}
                </span>

                <p>{this.props.question.optionOne.votes.length}</p>
                <p>{this.props.question.optionTwo.votes.length}</p>

                <p>You said</p>
                <p>{this.props.question.optionOne.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>
                <p>{this.props.question.optionTwo.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>

                <button className="pure-button pure-button-primary">Submit</button>
            </div>
        )
    }
}

export default connector(QuestionSummary)