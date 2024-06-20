import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Leaderboard() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent problemset={[]} />)} SSelected={'leaderboards'} promise={promise} />
    ) 
}

function MainContent({problemset}) { 
    return (
        // TODOM do smt about this CSS, the main div is created in the template
            <div id = "main" className = "main_content" style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", columnGap:"clamp(6px, 2vw, 48px)"}}>
                <div className='section'>
                    <h1>Exp Leaderboard</h1>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Exp</th>
                        </tr>
                    </table>
                </div>
                <div className='section'>
                    <h1>Badges Leaderboard</h1>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Badges</th>
                        </tr>
                    </table>
                </div>
            </div>
    )
}