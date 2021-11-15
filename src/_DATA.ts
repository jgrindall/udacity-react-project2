import {QuestionList, UserList, Question, QuestionDefn, User, AnswerList, AnswerOption} from "./types";

let users : UserList = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: "/icon1.png",
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: "/icon2.png",
        answers: {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: "/icon3.png",
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
};

let questions:QuestionList = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['sarahedo'],
            text: 'have horrible short term memory',
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero',
        },
        optionTwo: {
            votes: ['johndoe', 'sarahedo'],
            text: 'become a supervillain'
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic'
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be a back-end developer'
        }
    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['tylermcginnis'],
            text: 'find $50 yourself',
        },
        optionTwo: {
            votes: ['johndoe'],
            text: 'have your best friend find $500'
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['johndoe'],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: ['tylermcginnis'],
            text: 'write Swift'
        }
    },
};

function rnd(): string{
    return  Math.random().toString(36).substring(2, 15);
}

function generateUID ():string {
    return rnd() + rnd();
}

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


