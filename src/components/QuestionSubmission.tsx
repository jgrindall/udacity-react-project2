import React, {Component, SyntheticEvent} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {RootState, Question, QuestionOption, AnswerOption} from "../types";
import QuestionRadio from "./QuestionRadio";
import {handleSubmission} from "../actions/shared";
import _ from "underscore";
import Avatar from "./Avatar";

const mapStateToProps = (state: RootState) => {
    return {
        authedUser: state.authedUser,
        users:state.users
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    question: Question
};

type MyState = {
    selected: AnswerOption
};

class QuestionSubmission extends Component<MyProps, MyState> {
    state = {
        selected: AnswerOption.OPTION1
    };

    updateSelected(option:AnswerOption){
        this.setState((currentState)=>{
            return {
                ...currentState,
                selected:option
            }
        });
    }

    onValueChange(e:SyntheticEvent<HTMLInputElement>){
        const target = (e.target as HTMLInputElement);
        this.updateSelected(target.value as AnswerOption);
    }
    onSubmit(e:SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        if(this.state.selected){
            this.props.dispatch(handleSubmission(this.props.authedUser, this.props.question.id, this.state.selected));
        }
        else{
            alert("Please select an option");
        }
    }
    render() {
        const question = this.props.question;
        const author = this.props.users[question.author];
        const authorName = author ? author.name : "<Unknown user>";
        const answerOptions:AnswerOption[] = [
            AnswerOption.OPTION1,
            AnswerOption.OPTION2
        ];
        let selectedOption:AnswerOption | undefined = undefined;
        if(this.props.authedUser){
            selectedOption = _.find(answerOptions, (key:AnswerOption) => {
                const option: QuestionOption = question[key] as QuestionOption;
                return !!(option && this.props.authedUser && option.votes.includes(this.props.authedUser));
            });
        }
        const yourAnswer = (
            selectedOption
                ?
                <p>
                    {"You said you would rather " + question[selectedOption].text}
                </p>
                :
                <p></p>
            );
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        const options = (answerOptions.map((key:AnswerOption)=>{
            return <QuestionRadio
                value={key}
                disabled={!!selectedOption}
                text={question[key].text}
                votes={{
                    count:question[key].votes.length,
                    percent:question[key].votes.length * 100/totalVotes
                }}
                checked={[selectedOption, this.state.selected].includes(key)}
                onChange={this.onValueChange.bind(this)}
            />;
        }));

        return (
            <div className="question">
                <p>
                    {authorName} asked would you rather:
                </p>
                <div className="container">
                    <div className="left">
                        <Avatar
                            user={author}
                            size={"default"}
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            {
                                options
                            }
                            <p className="center">
                                <button
                                    disabled={!!selectedOption}
                                    className="pure-button pure-button-primary"
                                >
                                    Submit
                                </button>
                            </p>

                        </form>
                        {
                            yourAnswer
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default connector(QuestionSubmission)