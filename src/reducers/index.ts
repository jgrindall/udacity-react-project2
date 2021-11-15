import {combineReducers} from "redux";
import authedUser from "./authedUser";
import users from "./users";
import quizUsers from "./quizUsers";
import tweets from "./tweets";

const reducer = combineReducers({
    authedUser,
    users,
    quizUsers,
    tweets
});

export default reducer;
