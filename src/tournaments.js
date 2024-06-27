import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Tournaments() {
    const [isThisNeeded, setThis] = useState(true);
    const tournaments = useRef(null);
    
    const promise = API.getAllTournaments(template.getCookie('token'))
    promise.then((resp) => {
        tournaments.current = resp.reply;
    })
    return ( 
        < template.Home MainContent={() => (<MainContent tournaments={tournaments.current} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({tournaments}) { 
    return (
        <>
            {tournaments.map(tournament => (
                <div className='section'>
                    <h1>{tournament.title}</h1>
                    <template.StaticTable id = {tournament.title} headers = {["Problem Set"]} width = {[1]} data={tournament.problems.map((problem) => [(
                        <a href={'problems/' + problem}>{problem}</a> //TODO @LWK19 Help me get the titles
                    )])}/>
                </div>
            ))}
        </>
    )
}