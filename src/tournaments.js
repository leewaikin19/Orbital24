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
    console.log(tournaments.map(x => x.title))
    return (
        <div className='section'>
            <h1>Tournament Problem Set</h1>
            {tournaments.length > 0 ? (<table>
                <tr>
                    <th>Problem Set</th>
                </tr>
                {tournaments.map(tournament => (
                    <tr>
                        {
                            //TODOM create tournament landing page for tournaments
                        }
                        <td>{tournament.title}</td> 
                    </tr>
                ))}
            </table>) : (<p>Tournament has not begun yet. Please come back later!</p>)}
        </div>
    )
}