/* eslint-disable */
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Homepage() {
    const solvedProblems = useRef(null);
    const unsolvedProblems = useRef(null);
    const promise1 = API.dashboard(template.getCookie('token'))
    const promise2 = API.getAllProblems(template.getCookie('token'))

    promise1.then(resp1 => {
        promise2.then(resp2 => {
            // find problems that are already solved
            solvedProblems.current = resp1.reply.problemsSolved.map(id => resp2.reply.find(x => x.id === id));
            unsolvedProblems.current = resp2.reply
                .map(x => !resp1.reply.problemsSolved.includes(x.id) ? x : undefined)
                .filter(x => x !== undefined);
        })
    })
    const promise = Promise.all([promise1, promise2])
    return (
        < template.Home MainContent={
            () => (
                < MainContent solvedProblems={solvedProblems.current}
                    unsolvedProblems={unsolvedProblems.current} />
            )
        } MSelected={'Home'} promise={promise} />
    )
}

export function MainContent({ solvedProblems, unsolvedProblems }) {
    return (
        <>
            <h1>Recommended Problems</h1>
            <template.StaticTable id="recommended_problems" headers={['Problem Title', 'Exp']} width={[7, 1]} data={unsolvedProblems.map(
                (problem) => ([<div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a> <img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />
            <h1>Solved Problems</h1>
            <template.StaticTable id="solved_problems" headers={['Problem Title', 'Exp']} width={[7, 1]} data={solvedProblems.map(
                (problem) => ([<div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a> <img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />
        </>
    )
}