import React from "react";
import {User} from "../types";

function Avatar (props:{
    user:User,
    size: string
}) {
    const src = (props.user?.avatarURL || "/unknown.png");
    const className = `avatar avatar-${props.size}`;
    return (
        <img
            className = {className}
            alt="avatar"
            src={src}
        />
    );
}

export default Avatar;
