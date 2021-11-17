import {QuestionList} from "../types";

export const RECEIVE_QUESTIONS: string = 'RECEIVE_QUESTIONS';

export type QAction = {
    type: string,
    questions: QuestionList
};

export function receiveQuestions(questions: QuestionList) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}
