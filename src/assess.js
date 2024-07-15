/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as parts from "./creator_parts.js"
import * as Edit from "./edit.js"

/* eslint-disable */
export default function Assess() {
    const [loading, setLoading] = useState(true);
    const problem = useRef();
    const solution = useRef();
    const id = window.location.href.split('/').at(-1);

    const promise1 = API.getAssessableProblem(template.getCookie('token'), id).then((resp) => {
        if (resp.success === false || resp.reply === null || resp.reply.status === 'approved') {
            window.location.href = '/createassessprobems'
        }
        problem.current = resp.reply;
    })
    const promise2 = API.getAssessableProblemSolution(template.getCookie('token'), id).then((resp) => {
        solution.current = resp.reply;
    })

    const promise = Promise.all([promise1, promise2]).then(() => setLoading(false))

    return (
        < template.Home MainContent={() => (
            <MainContent problem={problem.current} solution={solution.current} />)} SSelected={'createassessprobems'} promise={promise} />
    )
}

function MainContent({ problem, solution }) {
    const [proposed_exp, setProposedExp] = useState(problem.xp);
    const [proposed_diff, setProposedDiff] = useState(problem.difficulty);
    const [triggerApproved, setTriggerApproved] = useState(false);
    const [triggerRejected, setTriggerRejected] = useState(false);
    const [triggerError, setTriggerError] = useState(false);

    function updateProblem(title, statement, sandbox, hints, mcqs, srqs, mcqAns, srqAns, setTriggerSuccessfullySaved, setTriggerUnsuccessfullySaved) {
        const TEMPORARY_XP_VALUE = 50;
        const TEMPORARY_DIFFICULTY_VALUE = -1;
        API.updateProblem(template.getCookie('token'), problem.id, 
        {'title':title, 'statement':statement, 'sandbox':sandbox, 'hints':hints.filter((hint) => (hint!="")), 
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

    function approve() {
        API.updateProblem(template.getCookie('token'), problem.id,
            { 'status': 'approved', 'xp': proposed_exp, 'difficulty': proposed_diff }, {})
            .then((resp) => {
                if (resp.success) {
                    setTriggerApproved(true)
                } else {
                    setTriggerError(true)
                    template.handleErrors(resp.msg);
                }
            })
    }

    function reject() {
        API.updateProblem(template.getCookie('token'), problem.id,
            { 'status': 'rejected' }, {})
            .then((resp) => {
                if (resp.success) {
                    setTriggerRejected(true)
                } else {
                    setTriggerError(true)
                    template.handleErrors(resp.msg);
                }
            })
    }

    return (
        <>
            <template.Popup id="approved_popup" title="Problem Approved" content="Successfully published problem" trigger={triggerApproved} setTrigger={setTriggerApproved} onClickAction={() => window.location.href="/createassessprobems"} />
            <template.Popup id="rejected_popup" title="Problem Rejected" content="Successfully rejected problem" trigger={triggerRejected} setTrigger={setTriggerRejected} onClickAction={() => window.location.href="/createassessprobems"} />
            <template.Popup id="error_popup" title="Error" content="An error occured. Please try again." trigger={triggerError} setTrigger={setTriggerError} />
            <parts.generic_main_content problem={problem} solution={solution} func={updateProblem} />
            <div>
                <h2>Approve/Reject Problem</h2>
                <div style={{ display: "flex", flexDirection: "column", rowGap: "1em", marginBottom: "clamp(6px, 6vh, 24px)" }}>
                    <p>Propose an exp value for this problem</p>
                    <template.FormInput name="proposed_exp" value={proposed_exp} onChange={e => setProposedExp(e.target.value)} placeholder="Propose an Exp value for this problem" />
                    <p>Propose a difficulty level for this problem</p>
                    <template.FormInput type='number' name="proposed_exp" value={proposed_diff} onChange={e => setProposedDiff(e.target.value)} placeholder="Propose a Difficulty level (1-5) for this problem" />
                </div>

                <div style={{ display: "flex", flexDirection: "row", columnGap: "1em" }}>
                    <button id='approve_button' className='action_button animated_button' onClick={approve}><i class="fa-solid fa-thumbs-up"></i> <span>Approve Problem</span></button>
                    <button id='reject_button' className='action_button animated_button' onClick={reject}><i class="fa-solid fa-thumbs-down"></i> <span>Reject Problem</span></button>
                </div>
            </div>
        </>
    )
}