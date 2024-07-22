/* eslint-disable */
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Explore() {
    const problems = useRef(null);
    
    const promise = API.getAllProblems(template.getCookie('token'))
    promise.then((resp) => {
        problems.current = resp.reply;
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={problems.current} />)} MSelected={'Problems'} promise={promise} />
    ) 
}


export function MainContent({problems}) { 
    const [problemlist, setProblemlist] = useState(problems);
    return (<>
        <h1>Explore/Search Problems</h1>
        <template.FormInput 
            id="search" 
            label="Search"
            style={{margin:"2vh 0px"}}
            placeholder="Search for problem titles here..."
            onInput={(e) => setProblemlist(problems.filter((problem) => (problem.title.toUpperCase().includes(e.target.value.toUpperCase()))))} />
        {problemlist.length == 0 ? (<h2 style={{textAlign:"center", color:"var(--red)"}}>No problems found</h2>) : (
        <template.StaticTable id="explore_problems" headers={['Problem Title', 'Exp']} width={[7,1]} data={problemlist.map(
            (problem) => ([<div className="problem_flair"><a href={'problems/' + problem.id}>{problem.title}</a><img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />)}
    </>
    )
}