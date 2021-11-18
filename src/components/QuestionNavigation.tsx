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
    filter: "answered" | "unanswered"
};

type MyState = {

};

class QuestionNavigation extends Component<MyProps, MyState> {
    render() {
        return (
            <p className="title">
                <Link className={this.props.filter === "unanswered" ? "link active" : "link"} to={{
                    pathname: '/questions/unanswered'
                }}>
                    Unanswered Questions
                </Link>
                <Link className={this.props.filter === "answered" ? "link active" : "link"} to={{
                    pathname: '/questions/answered'
                }}>
                    Answered Questions
                </Link>
            </p>
        );
    }
}

export default connector(QuestionNavigation)