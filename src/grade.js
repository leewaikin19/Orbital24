/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Grade() {
    const [isThisNeeded, setThis] = useState(true);
    const submissions = useRef(null);
    const problems = useRef(null);
    const promise1 = API.getAllGradableSubmissions(template.getCookie('token')).then((resp) => {
        submissions.current = resp.reply
    })
    const promise2 = API.getAllProblems(template.getCookie('token')).then((resp)=> {
        problems.current = resp.reply
    })
    const promise = Promise.all([promise1, promise2])
    promise.then(() => {
        problems.current = submissions.current.map(sub => problems.current.find(prob => prob.id === sub.questionID))
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={problems.current} submissions={submissions.current} />)} SSelected={'grade'} promise={promise} />
    ) 
}

function MainContent({problems, submissions}) {
    return (
        <>
            <template.StaticTable id="gradables" headers={["Problems", "Submissions"]} width={[1, 1]} data={problems.map((problem, index) => (
                [<a href={'problems/' + problem.id}>{problem.title}</a>, <a href={'grade/' + submissions[index].id}>{submissions[index].id}</a>]
            ))} />
        </>
    )
}