/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Grade() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={["Test"]} submissions={["Test"]} />)} SSelected={'grade'} promise={promise} />
    ) 
}

function MainContent({problems, submissions}) {
    return (
        <>
            <template.StaticTable id="gradables" headers={["Problems", "Submissions"]} width={[1, 1]} data={problems.map((problem, index) => (
                [<a href={'problems/' + problem.id}>{problem}</a>, submissions[index]]
            ))} />
        </>
    )
}