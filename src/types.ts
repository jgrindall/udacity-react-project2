import {Route} from "react-router-dom";
import React from "react";
import {RouteProps, Redirect} from "react-router-dom";

export type AnswerOption = 'optionOne'  | 'optionTwo';

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
    quizUsers:UserList,
    questions: QuestionList
};

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
}
