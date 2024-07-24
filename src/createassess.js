import { useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function CreateAssess() {
    //const approvedProblems = useRef(null);
    const assessableProblems = useRef(null);
    const createdProblems = useRef(null);
    //const user = useRef(null);

    const promise1 = API.getAssessableProblems(template.getCookie('token'))
    promise1.then((resp) => {
        assessableProblems.current = resp.reply;
    })
    const promise2 = API.getUserCreatedProblems(template.getCookie('token'))
    promise2.then((resp) => {
        createdProblems.current = resp.reply
    })

    const promise = Promise.all([promise1, promise2])
    return (
        < template.Home MainContent={() => (<MainContent assessableProblems={assessableProblems.current} createdProblems={createdProblems.current}/>)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

export function MainContent({assessableProblems, createdProblems}) {
    return (
        <>
            {(assessableProblems == null ? null : ( // Conditional rendering
                <div className='section'>
                    <h1>Assess Others' Problems</h1>
                    <template.StaticTable id = "assessable_problems" headers={["Problem Title"]} width={[1]} data={assessableProblems.map(
                        (problem) => ([<div className='problem_flair'><a href={'assess/' + problem.id}>{problem.title}</a> <img alt="" height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>]))} />
                </div>))}
            <div className='section'>
                <h1>Created Problems</h1>
                <template.StaticTable id = "created_problems" headers={["Problem Title", "Status"]} width={[4,1]} data={createdProblems.map(
                    (problem) => ([<a href={'edit/' + problem.id}>{problem.title}</a>, problem.status==='pending'
                    ? "Pending" : problem.status==='approved'
                    ? <p style={{color:"var(--green)"}}>Approved</p>
                    : <p style={{color:"var(--red)"}}>Rejected</p>]))} />
            </div>
            <template.ActionButton content='Create New Problem' onClickAction={() => window.location.href = "create"} icon='fa-solid fa-plus' />
        </>
    )
}