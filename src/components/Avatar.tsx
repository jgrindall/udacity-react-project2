import React from "react";
import {User} from "../types";

function Avatar (props:{
    user:User,
    size: string
}) {
    const src = (props.user?.avatarURL || "/unknown.png");
    return (
        <img
            className = {"avatar " + ("avatar-" + props.size)}
            alt="avatar"
            src={src}
        />
    );
}

export default Avatar;
