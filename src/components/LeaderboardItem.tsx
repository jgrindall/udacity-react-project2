import React from "react";
import {User, LeaderboardInfo} from "../types";
import Avatar from "./Avatar";

function LeaderboardItem (props:{
    user:User,
    info: LeaderboardInfo
}) {
    return (
        <li>
            <Avatar
                user={props.user}
                size={"default"}
            />
            <span>
                {props.user.name}
            </span>
            <span>
                Asked: {props.info.asked}
            </span>
            <span>
                Answered: {props.info.answered}
            </span>
            <span>
                Total: {props.info.asked + props.info.answered}
            </span>
        </li>
    );
}

export default LeaderboardItem;