/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Create() {
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

function MainContent() {
    const [title, setTitle] = useState("")
    const [statement, setStatement] = useState("")
    function addHint() {
        const hint_container = document.getElementById("hint_container")
        hint_container.appendChild(Test())
    }

    return (
        <>
            <template.TextArea name="Title" value={title} setValue={setTitle} placeholder={"Enter Title"} style={{fontSize:"var(--title)", fontWeight: 900, color:"var(--orange)"}} />
            <template.TextArea name="Statement" value={statement} setValue={setStatement} placeholder={"Enter Problem Statement"} />
            <div id='sandbox_container' className='section'>
                <h2>Sandbox</h2>
                <button id='create_sandbox' className='action_button animated_button' onClick={() => alert("Feature under construction! Coming soon!")}><span>Create Sandbox</span></button>
            </div>
            <div className='section'>
                <h2>Hints</h2>
                <div id='hint_container'>

                </div>
                <button id='create_hint' className='action_button animated_button' onClick={() => addHint()}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
            </div>

        </>
    )
}