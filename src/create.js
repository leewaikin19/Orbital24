/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as parts from "./creator_parts.js"

export default function Create() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent() {
    function saveProblem(title, statement, sandbox, hints, mcqs, srqs, mcqAns, srqAns, setTriggerSuccessfullySaved, setTriggerUnsuccessfullySaved) {
        const TEMPORARY_XP_VALUE = 50;
        const TEMPORARY_DIFFICULTY_VALUE = -1;
        title = (title == "" ? "Untitled Problem" : title)
        API.createProblem(template.getCookie('token'), 
               title, statement, sandbox, hints.filter((hint) => (hint!="")), 
               TEMPORARY_DIFFICULTY_VALUE, TEMPORARY_XP_VALUE, 
               mcqs.filter((mcq) => (mcq.qn!="")), srqs.filter((srq) => (srq.qn!="")), 
               mcqAns, srqAns,
               )
        .then((resp) => {
            if(resp.success){
                setTriggerSuccessfullySaved(true)
            } else {
                setTriggerUnsuccessfullySaved(true)
            }})
        }

    const empty_problem = useRef({
        'title': '',
        'statement': '',
        'sandbox': '',
        'hints': [],
        'mcqs': [],
        'srqs': []
    })

    const empty_solution = useRef({
        'mcqAns': [],
        'srqAns': []
    })

    return (
        <parts.generic_main_content problem={empty_problem.current} solution={empty_solution.current} func={saveProblem} />
    )
}