import { useState, useRef } from 'react'
import * as API from '../API.js'
import * as template from "../template.js"
/* eslint-disable */
export default function pigeonhole() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.getProblem(template.getCookie('token'), "")//TODO @LWK19 need questionID here
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={[]} />)} promise={promise} />
    ) 
}

function MainContent({problems}) { 

    return (
        <>
                <>
                    <h1>Problem Title</h1>
                </>
                <div className='description'>
                    <p>Problem Description</p>
                </div>
                {impt_note({note: "This is an important note"})}
                {step({title: "Step 1", desc: "This is step 1"})}
                </>
    )
}

function impt_note({note}) {
    return(
        <div className="impt_note">
            <div className='impt_note_title'>
                Important Note!
                <div className='content'>
                {note}
                </div>
            </div>
        </div>
    )
}

function step({title, desc}) {
    return(
        <div className="step">
            <div className='step_title'>
                {title}
                <div className='content'>
                {desc}
                </div>
            </div>
        </div>
    )
}