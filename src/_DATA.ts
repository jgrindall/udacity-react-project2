import {QuestionList, UserList, Question, QuestionDefn, User, AnswerList, AnswerOption} from "./types";
import db from "./db";
import {generateUID} from "./utils";

let users : UserList = db.users;
let questions:QuestionList = db.questions;

export async function _getQuizUsers ():Promise<UserList> {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                ...users
            });
        }, 1000);
    })
}

export async function _getQuestions ():Promise<QuestionList> {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                ...questions
            });
        }, 1000);
    })
}

function formatQuestion (defn: QuestionDefn) : Question{
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author: defn.author,
        optionOne: {
            votes: [],
            text: defn.optionOneText,
        },
        optionTwo: {
            votes: [],
            text: defn.optionTwoText,
        }
    }
}

export async function _saveQuestion (defn:QuestionDefn): Promise<Question> {
    return new Promise((res) => {
        const authedUser = defn.author;
        const formattedQuestion = formatQuestion(defn);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([formattedQuestion.id])
                }
            };

            res(formattedQuestion)
        }, 1000)
    })
}

function updateUser(authedUser:string, qid:string, answer:AnswerOption){
    const user: User = users[authedUser];
    const currentAnswers: AnswerList = user.answers;
    const newAnswers: AnswerList = {
        ...currentAnswers,
        [qid]: answer
    };

    const newUser: Record<string, User> = {
        [authedUser]: {
            ...user,
            answers: newAnswers
        }
    };
    users = {
        ...users,
        ...newUser
    };
}

function updateQuestions(authedUser:string, qid:string, answer:AnswerOption){
    const question:Question = questions[qid];
    const newQuestion:Question = {
        ...questions[qid],
        [answer]: {
            ...question[answer],
            votes: question[answer].votes.concat([authedUser])
        }
    };
    const newQuestionList  = {
        [qid]: newQuestion
    };
    questions = {
        ...questions,
        ...newQuestionList
    }
}

export async function _saveQuestionAnswer (quesAnswer: { authedUser:string, qid:string, answer:AnswerOption }) : Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            updateUser(quesAnswer.authedUser, quesAnswer.qid, quesAnswer.answer);
            updateQuestions(quesAnswer.authedUser, quesAnswer.qid, quesAnswer.answer);
            res();
        }, 1000);
    })
}

export function getDummyQuestion():Question {
    return {
        id: "1",
        author:"",
        timestamp: 1,
        optionOne:{
            text:"string",
            votes:[]
        },
        optionTwo:{
            text:"string",
            votes:[]
        }
    };
}
