import {getInitialData} from '../utils/api';
import {receiveUsers, QAction} from '../actions/users';
import {receiveQuizUsers, QAction as QAction2} from '../actions/quizUsers';
import {receiveQuestions, QAction as QAction3} from "../actions/questions";

export function handleInitialData(): any {
    return (dispatch: any) => {
        return getInitialData()
            .then( (response) => {
                //dispatch(receiveUsers(response.users));
                dispatch(receiveQuizUsers(response.quizUsers));
                dispatch(receiveQuestions(response.questions));
            })
    }
}
