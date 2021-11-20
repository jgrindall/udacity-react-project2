import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {RootState, Question} from "../types";
import _ from "underscore";
import moment from "moment";

const mapStateToProps = (state: RootState) => {
    return {
        users:state.users
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    question: Question
};

const formatQuestion = (s:string)=>{
    const numWords = 3;
    return "would your rather " + _.first(s.split(" "), numWords).join(" ") + "... or ...";
};

class QuestionSummary extends Component<MyProps, {}> {
    render() {
        const question:Question = this.props.question;
        let authorName:string = "<Unknown user>", avatar = "/unknown.png";
        const author = this.props.users[question.author];
        const date = moment(question.timestamp).fromNow();
        if(author){
            avatar = author.avatarURL;
            authorName = author.name;
        }
        return (
            <div className="question">
                <p>
                    {date}
                </p>
                <p>
                    {authorName + " asked"}
                </p>
                <div className="container">
                    <div className="left">
                        <img className="avatar" alt="avatar" src={avatar}/>
                    </div>
                    <div className="right">
                        <p>
                            {formatQuestion(question.optionOne.text || "")}
                        </p>
                        <div className="center" style={{"marginTop": "50px"}}>
                            <Link
                                className="link"
                                to={{
                                    pathname: '/question/' + question.id
                                }}
                            >
                                View Poll
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connector(QuestionSummary)