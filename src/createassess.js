/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function CreateAssess() {
    const approvedProblems = useRef(null);
    const assessableProblems = useRef(null);
    const createdProblems = useRef(null);

    const promise1 = API.getAssessableProblems(template.getCookie('token'))
    promise1.then((resp) => {
        assessableProblems.current = resp.reply;
    })
    const promise2 = API.getAllProblems(template.getCookie('token'))
    promise2.then((resp) => {
        approvedProblems.current = resp.reply;
    })
    const promise3 = API.getUserCreatedProblems(template.getCookie('token'))
    promise3.then((resp) => {
        Promise.all([promise1, promise2]).then(() => {
            const problems = approvedProblems.current.concat(assessableProblems.current);
            createdProblems.current = resp.reply.map(id => problems.find(x => x.id === id)).filter(x => x!==undefined)
        }
        )
    })

    const promise = Promise.all([promise1, promise2, promise3])
    return (
        < template.Home MainContent={() => (<MainContent assessableProblems={assessableProblems.current} createdProblems={createdProblems.current} approvedProblems={approvedProblems.current} />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent({assessableProblems, createdProblems, approvedProblems}) {
    return (
        <>
            <div className='section'>
                <h1>Assess Others' Problems</h1>
                <template.StaticTable id = "assessable_problems" headers={["Problem Title"]} width={[1]} data={assessableProblems.map(
                    (problem) => ([<div className='problem_flair'><a href={'assess/' + problem.id}>{problem.title}</a> <img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>]))} />
            </div>
            <div className='section'>
                <h1>Created Problems</h1>
                <template.StaticTable id = "created_problems" headers={["Problem Title", "Status"]} width={[4,1]} data={createdProblems.map(
                    (problem) => ([<a href={'problems/' + problem.id}>{problem.title}</a>, problem.pending?"Pending":'Approved']))} />
            </div>
            <button className='action_button animated_button' onClick={() => window.location.href = "create"}>
                    <i class="fa-solid fa-plus"></i> {" "}
                    <span>Create New Problem</span>
            </button>
        </>
    )
}