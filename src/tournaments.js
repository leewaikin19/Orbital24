/* eslint-disable */
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Tournaments() {
    const tournaments = useRef(null);
    const problems = useRef(null);

    const promise1 = API.getAllTournaments(template.getCookie('token'));
    const promise2 = API.getAllProblems(template.getCookie('token'));
    promise1.then((resp) => {
        tournaments.current = resp.reply;
    })
    promise2.then((resp) => {
        problems.current = resp.reply;
    })
    return ( 
        < template.Home MainContent={() => (<MainContent tournaments={tournaments.current} problems={problems.current}/>)} SSelected={'tournaments'} promise={Promise.all([promise1, promise2])} />
    ) 
}

export function MainContent({tournaments, problems}) { 
    return (
        <>
            {tournaments.map(tournament => (
                <div className='section'>
                    <h1>{tournament.title}</h1>
                    <template.StaticTable id = {tournament.title} headers = {["Problem Set"]} width = {[1]} data={tournament.problems.map(id => problems.find(x => x.id === id)).map((problem) => [(
                        <div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a><img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div> 
                    )])}/>
                </div>
            ))}
        </>
    )
}