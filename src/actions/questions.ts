import {QuestionList, Question} from "../types";

export enum ActionTypes {
    RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS',
    UPDATE_QUESTION = 'UPDATE_QUESTION',
    APPEND_QUESTION = 'APPEND_QUESTION'
}

export type Action =
    {
        type: ActionTypes.RECEIVE_QUESTIONS;
        questions: QuestionList
    }
    |
    {
        type: ActionTypes.UPDATE_QUESTION;
        question: Question
    }
    |
    {
        type: ActionTypes.APPEND_QUESTION;
        question: Question
    };

export function receiveQuestions(questions: QuestionList) : Action{
    return {
        type: ActionTypes.RECEIVE_QUESTIONS,
        questions
    }
}

export function updateQuestion(question: Question) : Action{
    return {
        type: ActionTypes.UPDATE_QUESTION,
        question
    }
}

export function appendQuestion(question: Question) : Action{
    return {
        type: ActionTypes.APPEND_QUESTION,
        question
    }
}
