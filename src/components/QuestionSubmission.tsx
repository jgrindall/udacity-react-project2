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

class QuestionSubmission extends Component<MyProps, MyState> {
    render() {
        let authorName = "<Unknown user>", avatar = "/unknown.png";
        const author = this.props.quizUsers[this.props.question.author];
        if(author){
            avatar = author.avatarURL;
            authorName = author.name;
        }

        const ans1 = this.props.authedUser ? this.props.question.optionOne.votes.includes(this.props.authedUser) : false;
        const ans2 = this.props.authedUser ? this.props.question.optionTwo.votes.includes(this.props.authedUser) : false;
        const isAnswered:boolean = ans1 || ans2;
        const option = ans1 ? this.props.question.optionOne : (ans2 ? this.props.question.optionTwo : null);
        const answer = isAnswered ? <p>{"You said: " + option?.text} </p> : <p></p>;
        return (
            <div className="question">

                <p>
                    {authorName} asked would you rather:
                </p>

                <div className="container">
                    <div className="left">
                        <img className="avatar" src={avatar}/>
                    </div>
                    <div className="right">

                        <form>
                            <div>
                                <input type="radio" id="optionOne" name="options" value="optionOne" disabled={isAnswered}/>
                                    <label htmlFor="optionOne">{this.props.question.optionOne.text}</label>
                                    <span>{isAnswered ? '(' + this.props.question.optionOne.votes.length + ' votes)' : ''}</span>
                            </div>

                            <div>
                                <input type="radio" id="optionTwo" name="options" value="optionTwo" disabled={isAnswered}/>
                                <label htmlFor="optionOne">{this.props.question.optionTwo.text}</label>
                                <span>{isAnswered ? '(' + this.props.question.optionTwo.votes.length + ' votes)' : ''}</span>

                            </div>

                            <button disabled={isAnswered} className="pure-button pure-button-primary">Submit</button>

                        </form>

                        {answer}

                    </div>
                </div>

            </div>
        )
    }
}

export default connector(QuestionSubmission)