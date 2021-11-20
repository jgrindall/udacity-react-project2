import {RouteProps} from "react-router-dom";

export enum AnswerOption {
    "OPTION1" = "optionOne",
    "OPTION2" = "optionTwo"
}

export enum QuestionFilter {
    ANSWERED = "answered",
    UNANSWERED = "unanswered"
}

export type AnswerList = Record<string, AnswerOption>;

export type User = {
    id: string,
    name:string,
    avatarURL: string,
    answers:AnswerList,
    questions:string[]
};

export type UserList = Record<string, User>;

export type QuestionOption = {
    votes: string[],
    text: string
};

export type QuestionDefn = {
    optionOneText:string,
    optionTwoText:string,
    author:string
};

export type Question = {
    id: string,
    author:string,
    timestamp: number,
    optionOne:QuestionOption,
    optionTwo:QuestionOption
};

export type QuestionList = Record<string, Question>;

export type RootState = {
    authedUser:string,
    users:UserList,
    questions: QuestionList
};

export interface ProtectedRouteProps extends RouteProps {
    isAllowed: boolean;
}

export type LeaderboardInfo = {
    asked:number,
    answered: number
}

export type AddQuestionState = {
    optionOneText?: string;
    optionTwoText?: string;
};