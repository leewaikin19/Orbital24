import { useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Homepage() {
    const solvedProblems = useRef(null);
    const unsolvedProblems = useRef(null);
    const user_real_name = useRef(null);
    const promise1 = API.dashboard(template.getCookie('token'))
    const promise2 = API.getAllProblems(template.getCookie('token'))

    promise1.then(resp1 => {
        promise2.then(resp2 => {
            user_real_name.current = resp1.reply.firstName + " " + resp1.reply.lastName;
            // find problems that are already solved
            solvedProblems.current = resp1.reply.problemsSolved
                .map(id => resp2.reply
                .find(x => x.id === id))
                .filter(x => x !== undefined);
            unsolvedProblems.current = resp2.reply
                .map(x => !resp1.reply.problemsSolved.includes(x.id) ? x : undefined)
                .filter(x => x !== undefined);
        })
    })
    const promise = Promise.all([promise1, promise2])
    return (
        < template.Home MainContent={
            () => (
                < MainContent user_real_name={user_real_name.current}
                    solvedProblems={solvedProblems.current}
                    unsolvedProblems={unsolvedProblems.current} />
            )
        } MSelected={'Home'} promise={promise} />
    )
}

export function MainContent({user_real_name, solvedProblems, unsolvedProblems }) {
    return (
        <>
            <div id='welcome_sign'>
                <p>Welcome, <b style={{color:"var(--orange)"}}>{user_real_name}</b>!</p>
                <em>Here are today's recommended problems:</em>
            </div>
            <div className='section'>
                <h1>Recommended Problems</h1>
                <template.StaticTable id="recommended_problems" headers={['Problem Title', 'Exp']} width={[7, 1]} data={unsolvedProblems.map(
                    (problem) => ([<div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a> <img alt="" height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />
            </div>
            <div className='section'>
                <h1>Solved Problems</h1>
                <template.StaticTable id="solved_problems" headers={['Problem Title', 'Exp']} width={[7, 1]} data={solvedProblems.map(
                    (problem) => ([<div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a> <img alt="" height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />
            </div>
        </>
    )
}