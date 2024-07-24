import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as parts from "./creator_parts.js"

export default function Edit() {
    const [, setLoading] = useState(true);
    const problem = useRef();
    const solution = useRef();
    const id = window.location.href.split('/').at(-1);

    const promise1 = API.getUserCreatedProblem(template.getCookie('token'), id).then((resp) => {
        if (resp.success === false || resp.reply.status === 'approved') {
            window.location.href = '/createassessprobems'
        }
        problem.current = resp.reply;
    })
    const promise2 = API.getUserCreatedProblemSolution(template.getCookie('token'), id).then((resp) => {
        solution.current = resp.reply;
    })

    const promise = Promise.all([promise1, promise2]).then(() => setLoading(false))
    return (
        < template.Home MainContent={() => (
            <MainContent problem={problem.current} solution={solution.current} />)} SSelected={'createassessprobems'} promise={promise} />
    )
}

export function MainContent({ problem, solution }) {
    function updateProblem(title, statement, sandbox, hints, mcqs, srqs, mcqAns, srqAns, setTriggerSuccessfullySaved, setTriggerUnsuccessfullySaved) {
        const TEMPORARY_XP_VALUE = 50;
        const TEMPORARY_DIFFICULTY_VALUE = -1;
        API.updateProblem(template.getCookie('token'), problem.id, 
        {'title':title, 'statement':statement, 'sandbox':sandbox, 'hints':hints.filter((hint) => (hint!=="")), 
            'xp':TEMPORARY_XP_VALUE, 'difficulty':TEMPORARY_DIFFICULTY_VALUE, 'mcqs':mcqs, 'srqs':srqs, 
            'autograded':srqAns.filter(x => x.autograded===false).length > 0, 'status':'pending'}, 
        {'mcqAns':mcqAns, 'srqAns':srqAns})
        .then((resp) => {
            if(resp.success){
                setTriggerSuccessfullySaved(true)
        }else {
            setTriggerUnsuccessfullySaved(true)
        }})
    }

    return (
        <parts.Generic_main_content problem={problem} solution={solution} func = {updateProblem} />
    )
}