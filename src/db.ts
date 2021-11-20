import {QuestionList, UserList, AnswerOption} from "./types";

let users : UserList = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: "/icon1.png",
        answers: {
            "8xf0y6ziyjabvozdd253nd": AnswerOption.OPTION1,
            "6ni6ok3ym7mf1p33lnez": AnswerOption.OPTION2,
            "am8ehyc8byjqgar0jgpub9": AnswerOption.OPTION2,
            "loxhs1bqm25b708cmbf3g": AnswerOption.OPTION2
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: "/icon2.png",
        answers: {
            "vthrdm985a262al8qx3do": AnswerOption.OPTION1,
            "xj352vofupe1dqz9emx13r": AnswerOption.OPTION2,
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: "/icon3.png",
        answers: {
            "xj352vofupe1dqz9emx13r": AnswerOption.OPTION1,
            "vthrdm985a262al8qx3do": AnswerOption.OPTION2,
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

const db = {
    users,
    questions
};

export default db;