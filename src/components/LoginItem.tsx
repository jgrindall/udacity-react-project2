import React, {MouseEventHandler} from "react";
import {User} from "../types";
import Avatar from "./Avatar";

function LoginItem (props:{
    user:User,
    onSelectUser: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <div className="user" key={props.user.id}>
            <Avatar
                user={props.user}
                size={"default"}
            />
            <span>
                {props.user.name}
            </span>
            <button
                className="pure-button pure-button-primary"
                onClick={props.onSelectUser}
            >
                Select
            </button>
        </div>
    );
}

export default LoginItem;