// This is the page for users to see the list of submissions

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Submissions() {
    const submissions = useRef([]);
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.getSubmissions(template.getCookie('token'), /*TODO @LWK19 get the problem id*/)
    promise.then((resp) => {
        submissions.current = resp.reply;
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent submissions = {submissions} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({submissions}) { 
    console.log(submissions)
    return (
                <div className='section'>
                    <h1>My Submissions</h1>
                    <template.StaticTable id="solved_problems" headers={['Submissions']} width={[7]} data={submissions.map(
                        (sub) => ([<a href={'./submissions/' + sub}>{new Date(/*TODO @LWK19 get the submission datetime*/).toLocaleString()}</a>]))} />
                </div>
    )
}