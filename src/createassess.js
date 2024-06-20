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
        < template.Home MainContent={() => (<MainContent assessableProblems={[]} createdProblems={[]} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({assessableProblems, createdProblems}) {
    return (
        <>
                <div className='section table_container'>
                    <h1>Assess Others' Problems</h1>
                    <table>
                        <tr>
                            <th>Problem Title</th>
                        </tr>
                        {assessableProblems.length > 0 ?
                        {/* for (let i = 0; i < assessableProb.length; i++) {
                            {row(solvedProblems[i])}; //TODO solve when the "problem" object is clearly defined.
                        } */} : (<tr>
                        <td>No problems to assess</td>
                        </tr>)}
                        
                    </table>
                </div>
                <div className='section table_container'>
                    <h1>Created Problems</h1>
                    <table>
                        <tr>
                            <th>Problem Title</th>
                            <th>Status</th>
                        </tr>
                        {/* for (let i = 0; i < tournaments.length; i++) {
                            {row(tournaments[i])}; //TODO solve when the "tournament" object is clearly defined.
                        } */}
                    </table>
                    <button className='action_button animated_button'>
                        <i class="fa-solid fa-plus"></i> {" "}
                        <span>Create New Problem</span>
                    </button>
                </div>
                </>
    )
}