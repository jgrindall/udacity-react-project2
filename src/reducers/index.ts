import {combineReducers} from "redux";
import authedUser from "./authedUser";
import users from "./users";
import quizUsers from "./quizUsers";
import questions from "./questions";
import tweets from "./tweets";

const reducer = combineReducers({
    authedUser,
    users,
    quizUsers,
    tweets,
    questions
});

export default reducer;
