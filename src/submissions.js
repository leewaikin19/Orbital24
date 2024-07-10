// This is the page for users to see their own submissions of a problem

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Submissions() {
    const submissions = useRef();
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);

    // problem id
    const id = window.location.href.split('/').at(-1);
    
    const promise = API.getOwnSubmissionsOfProblem(template.getCookie('token'), id)
    promise.then((resp) => {
        submissions.current = resp.reply;
    })
    return (
        < template.Home MainContent={() => (<MainContent submissions = {submissions.current} />)} MSelected={"Problems"} promise={promise} />
    ) 
}

function MainContent({submissions}) { 
    console.log(submissions)
    return (
                <div className='section'>
                    <h1>My Submissions</h1>
                    <template.StaticTable id="solved_problems" headers={['Submissions Dates']} width={[1]} data={submissions.map(
                        (sub) => ([<a href={'/submission/' + sub.id}>{new Date(sub.datetime).toLocaleString()}</a>]))} />
                </div>
    )
}