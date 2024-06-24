import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Leaderboard() {
    const [isThisNeeded, setThis] = useState(true);
    const xp = useRef(null);
    const badges = useRef(null);
    
    const promise = API.leaderboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log(resp)
        xp.current = resp.reply.xp;
        badges.current = resp.reply.badges;
    })
    return (
        < template.Home MainContent={() => (<MainContent expLeaderboards={xp.current} badgesLeaderboards={badges.current} />)} SSelected={'leaderboards'} promise={promise} /> 
    ) 
}

function MainContent({expLeaderboards, badgesLeaderboards}) { 
    return (
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", columnGap:"clamp(6px, 2vw, 48px)"}}>
                <div className='section'>
                    <h1>Exp Leaderboard</h1>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Exp</th>
                        </tr>
                        {expLeaderboards.map((entry, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{entry.firstName} {entry.lastName}</td>
                                    <td>{entry.xp}</td>
                                </tr>
                            )
                        })}

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
                        {badgesLeaderboards.map((entry, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{entry.firstName} {entry.lastName}</td>
                                    <td>{entry.badges.length}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
    )
}