import React, {ChangeEvent, Component, SyntheticEvent} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {AnswerOption, AddQuestionState, RootState, QuestionFilter} from "../types";
import {handleAddQuestion} from "../actions/shared";
import Avatar from "./Avatar";

const mapStateToProps = (state: RootState) => {
    return {
        author: state.users[state.authedUser]
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {};

class AddQuestion extends Component<MyProps, AddQuestionState> {
    state = {
        optionOneText: "",
        optionTwoText: ""
    };
    onChange(type:AnswerOption, e:ChangeEvent<HTMLInputElement>){
        const value:string = e.target.value;
        const newState:AddQuestionState = (
            type === AnswerOption.OPTION1
                ?
                {
                    optionOneText: value
                }
                :
                {
                    optionTwoText: value
                }
            );

        this.setState((currentState:AddQuestionState)=>{
            return {
                ...currentState,
                ...newState
            };
        });
    }
    onSubmit(e:SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        this.props.dispatch(handleAddQuestion(
            {
                ...this.state,
                author:this.props.author.id
            },
            ()=>{
                /**
                 * redirect the user
                 */
                alert("Qestion added");
                this.props.history.push("/questions/" + QuestionFilter.UNANSWERED);
            })
        );
        return false;
    }
    render() {
        // should we enable the submit button?
        const valid = !!this.state.optionOneText.trim() && !!this.state.optionOneText.trim();

        return (
            <div className="addQuestion">
                <p>
                    {this.props.author.name}, create a new question!
                </p>
                <div className="container">
                    <div className="left">
                        <Avatar
                            user={this.props.author}
                            size={"default"}
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <p>
                                Would you rather...
                            </p>
                            <input
                                type="text"
                                placeholder="Option One"
                                value={this.state.optionOneText}
                                onChange={this.onChange.bind(this, AnswerOption.OPTION1)}
                            />
                            <br/>
                            <input
                                type="text"
                                placeholder="Option Two"
                                value={this.state.optionTwoText}
                                onChange={this.onChange.bind(this, AnswerOption.OPTION2)}
                            />
                            <br/>
                            <button disabled={!valid} className="pure-button pure-button-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connector(AddQuestion);