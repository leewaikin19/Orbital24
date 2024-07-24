import { useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Grade() {
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
        problems.current = submissions.current.map(sub => problems.current.find(prob => prob.id === sub.questionID)).filter(x => x !== undefined)
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={problems.current} submissions={submissions.current} />)} SSelected={'grade'} promise={promise} />
    ) 
}

export function MainContent({problems, submissions}) {
    return (
        <>
            <template.StaticTable id="gradables" headers={["Problems", "User", "Date"]} width={[1, 1, 4]} data={problems.map((problem, index) => (
                [<a href={'problems/' + problem.id}>{problem.title}</a>, submissions[index].username, <a href={'grade/' + submissions[index].id}>{new Date(submissions[index].datetime).toLocaleString()}</a>]
            ))} />
        </>
    )
}