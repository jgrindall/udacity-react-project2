import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {RootState, Question} from "../types";
import _ from "underscore";

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

const formatQuestion = (s:string)=>{
    const numWords = 3;
    return "would your rather " + _.first(s.split(" "), numWords).join(" ") + "... or ...";
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
                    {authorName + " asked"}
                </p>
                <div className="container">
                    <div className="left">
                        <img className="avatar" src={avatar}/>
                    </div>
                    <div className="right">

                        <p>
                            {formatQuestion(question.optionOne.text || "")}
                        </p>

                        <Link className="link" to={{
                            pathname: '/question/' + question.id
                        }}>View Poll</Link>

                    </div>
                </div>



            </div>
        )
    }
}

export default connector(QuestionSummary)