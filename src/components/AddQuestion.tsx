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

class AddQuestion extends Component<MyProps, MyState> {
    render() {
        let authorName = "<Unknown user>", avatar = "/unknown.png";
        const author = this.props.quizUsers[this.props.authedUser];
        if(author){
            avatar = author.avatarURL;
            authorName = author.name;
        }
        return (
            <div>
                <p>
                   create new question
                </p>
                <span>
                    {authorName}
                </span>
                <img src={avatar}/>

                <input type="text"/>

                <input type="text"/>

                <button className="pure-button pure-button-primary">Submit</button>
            </div>
        )
    }
}

export default connector(AddQuestion)