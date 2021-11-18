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

                        <form>
                            <div>
                                <input type="radio" id="optionOne" name="optionOne" value="optionOne" checked/>
                                    <label htmlFor="optionOne">{this.props.question.optionOne.text}</label>
                            </div>

                            <div>
                                <input type="radio" id="optionTwo" name="optionTwo" value="optionTwo"/>
                                <label htmlFor="optionOne">{this.props.question.optionTwo.text}</label>
                            </div>
                        </form>

                        <p>{this.props.question.optionOne.votes.length}</p>
                        <p>{this.props.question.optionTwo.votes.length}</p>

                        <p>You said</p>
                        <p>{this.props.question.optionOne.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>
                        <p>{this.props.question.optionTwo.votes.includes(this.props.authedUser) ? "YES" : "NO"}</p>

                        <button className="pure-button pure-button-primary">Submit</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default connector(QuestionSubmission)