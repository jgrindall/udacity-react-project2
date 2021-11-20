import {AnswerOption} from "../types";
import React  from 'react'

function QuestionRadio (props:{
    value:AnswerOption,
    disabled: boolean,
    text:string,
    votes:{
        count:number,
        percent:number
    },
    checked:boolean,
    onChange:any
}) {
    return (

        <div>
            <input
                type="radio"
                id={props.value}
                name="options"
                value={props.value}
                disabled={props.disabled}
                onChange={props.onChange}
            />

            <label
                htmlFor={props.value}
            >
                {props.text}
            </label>

            <span
                style={{"float": "right"}}
            >
                {
                    props.disabled
                        ?
                        props.votes.count + ' vote(s), ' + props.votes.percent.toFixed(1) + '%'
                        :
                        ''
                }
            </span>

        </div>
    );
}

export default QuestionRadio;