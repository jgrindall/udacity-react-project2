import React, {Component} from 'react'
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {RootState, Question, UserList, LeaderboardInfo} from "../types";
import LeaderboardItem from "./LeaderboardItem";

const mapStateToProps = (state: RootState) => {
    /**
     * create a hash mapping user id to info (questions asked, answered)
     */
    const users:UserList = state.users;
    let userIds:string[] = Object.keys(users);
    const userInfo: Record<string, LeaderboardInfo> = {};

    const questions:Question[] = Object.values(state.questions);

    const getData = (userId:string): LeaderboardInfo =>{
        const user = state.users[userId];
        return {
            asked: questions.filter(q => q.author === user.id).length,
            answered: Object.keys(user.answers).length
        };
    };

    userIds.forEach( (id:string)=>{
        userInfo[id] = getData(id);
    });

    return {
        authedUser: state.authedUser,
        questions:state.questions,
        users:state.users,
        userInfo: userInfo
    }
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MyProps = PropsFromRedux & RouteComponentProps & {
    question: Question
};

class Leaderboard extends Component<MyProps, {}> {
    render() {
        const users:UserList = this.props.users;
        let userIds:string[] = Object.keys(users);

        userIds = userIds.sort((id0:string, id1:string)=>{
            const total0 = this.props.userInfo[id0].answered + this.props.userInfo[id0].asked;
            const total1 = this.props.userInfo[id1].answered + this.props.userInfo[id1].asked;
            return total0 === total1 ? 0 : (total0 < total1 ? 1 : -1);
        });

        const entries = userIds.map( (userId:string) =>{
            return (
                <LeaderboardItem key={userId} user={users[userId]} info={this.props.userInfo[userId]}></LeaderboardItem>
            );
        });

        return (
            <div className="leaderboard">
                <p className="center">
                    Leaderboard:
                </p>
                <ul>
                   {entries}
                </ul>
            </div>
        )
    }
}

export default connector(Leaderboard)