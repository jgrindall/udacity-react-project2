import React  from 'react'
import {Link} from "react-router-dom";
import {QuestionFilter} from "../types";

function QuestionNavigation (props:{
    filter:QuestionFilter,
    numUnanswered:number,
    numAnswered:number
}) {
    return (
        <p className="title">
            <Link
                className={props.filter === QuestionFilter.UNANSWERED ? "link active" : "link"}
                to={{
                    pathname: '/questions/unanswered'
                }}
            >
                Unanswered Questions ({props.numUnanswered})
            </Link>

            <Link
                className={props.filter === QuestionFilter.ANSWERED ? "link active" : "link"}
                to={{
                    pathname: '/questions/answered'
                }}
            >
                Answered Questions ({props.numAnswered})
            </Link>

        </p>
    );
}

export default QuestionNavigation;
