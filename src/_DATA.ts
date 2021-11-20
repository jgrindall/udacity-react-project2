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

export async function _saveQuestion (defn:QuestionDefn): Promise<{user: User, question: Question }> {
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
            res({
                user: users[authedUser],
                question: formattedQuestion
            });
        }, 1000)
    })
}

function updateUser(authedUser:string, qid:string, answer:AnswerOption): User{
    const user: User = users[authedUser];
    const currentAnswers: AnswerList = user.answers;
    const newAnswers: AnswerList = {
        ...currentAnswers,
        [qid]: answer
    };

    const newUser:User = {
        ...user,
        answers: newAnswers
    };

    users = {
        ...users,
        [authedUser]:newUser
    };

    return newUser;
}

function updateQuestions(authedUser:string, qid:string, answer:AnswerOption):Question{
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
    };
    return newQuestion;
}

export async function saveQuestionAnswer (quesAnswer: { authedUser:string, qid:string, answer:AnswerOption }) : Promise<{user:User, question:Question}> {
    return new Promise((res) => {
        setTimeout(() => {
            const user:User = updateUser(quesAnswer.authedUser, quesAnswer.qid, quesAnswer.answer);
            const question:Question = updateQuestions(quesAnswer.authedUser, quesAnswer.qid, quesAnswer.answer);
            res({
                user,
                question
            });
        }, 1000);
    })
}

export async function getInitialData(): Promise<{users: UserList, questions: QuestionList, authedUser: string }> {
    const users: UserList = await _getQuizUsers();
    const questions = await _getQuestions();
    const authedUser = getAuthedUser();
    return {
        users,
        questions,
        authedUser
    };
}

function getAuthedUser():string{
    return localStorage.getItem("authedUser") || "";
}

export async function _saveUser(authedUser:string | null){
    localStorage.setItem("authedUser", authedUser || "");
}

