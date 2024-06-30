/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function CreateAssess() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })


    return (
        < template.Home MainContent={() => (<MainContent assessableProblems={[]} createdProblems={[]} />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent({assessableProblems, createdProblems}) {
    return (
        <>
            <div className='section'>
                <h1>Assess Others' Problems</h1>
                <template.StaticTable id = "assessable_problems" headers={["Problem Title"]} width={[1]} data={assessableProblems.map(
                    (problem) => ([<a href={'problems/' + problem.id}>{problem.title}</a>]))} />
            </div>
            <div className='section'>
                <h1>Created Problems</h1>
                <template.StaticTable id = "created_problems" headers={["Problem Title", "Status"]} width={[4,1]} data={createdProblems.map(
                    (problem) => ([<a href={'problems/' + problem.id}>{problem.title}</a>, problem.xp]))} />
            </div>
            <button className='action_button animated_button' onClick={() => window.location.href = "create"}>
                    <i class="fa-solid fa-plus"></i> {" "}
                    <span>Create New Problem</span>
            </button>
        </>
    )
}