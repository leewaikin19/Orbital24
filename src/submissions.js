import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Submissions() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent submissions={user.current.Submissions} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({submissions}) { 

    return (
                <div className='section'>
                    <h1>My Submissions</h1>
                    <template.StaticTable id="solved_problems" headers={['Submissions']} width={[7]} data={submissions.map(
                        (sub) => ([sub]))} />
                </div>
    )
}