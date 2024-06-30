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


function MainContent({problems}) { 
    return (<>
        <h1>Explore Problems</h1>
        <template.StaticTable id="explore_problems" headers={['Problem Title', 'Exp']} width={[7,1]} data={problems.map(
            (problem) => ([<a href={'problems/' + problem.id}>{problem.title}</a>, problem.xp]))} />
    </>
    )
}