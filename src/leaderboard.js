import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Leaderboard() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.leaderboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log("leader")
        console.log(resp)
    })
    return (
        < template.Home MainContent={() => (<MainContent expLeaderboards={{"firstName": [], "lastName": [], "exp": []}} badgesLeaderboards={{"firstName": [], "lastName": [], "badges": []}} />)} SSelected={'leaderboards'} promise={promise} /> // TODO @LWK19 I'm not sure how to grab the leaderboards
    ) 
}

function MainContent({expLeaderboards, badgesLeaderboards}) { 
    const expFirstName = expLeaderboards.firstName;
    const expLastName = expLeaderboards.lastName;
    const expExp = expLeaderboards.exp;
    const badgesFirstName = badgesLeaderboards.firstName;
    const badgesLastName = badgesLeaderboards.lastName;
    const badgesBadges = badgesLeaderboards.badges;
    function arrayise(first, last, thing) {
        var arr = []
        for (var i = 0; i < first.length; i++) {
            var dict = {"rank":i+1, "firstName": first[i], "lastName": last[i], "thing": thing[i]}
            arr.push(dict)
        }
        return arr;
    }
    return (
        // TODOM do smt about this CSS, the main div is created in the template
        // TODO @LWK19 what do you want me to do exactly
            <div id = "main" className = "main_content" style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", columnGap:"clamp(6px, 2vw, 48px)"}}>
                <div className='section'>
                    <h1>Exp Leaderboard</h1>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Exp</th>
                        </tr>
                        {arrayise(expFirstName, expLastName, expExp).map((entry) => {
                            return (
                                <tr>
                                    <td>{entry.rank}</td>
                                    <td>{entry.firstName} {entry.lastName}</td>
                                    <td>{entry.thing}</td>
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
                        {arrayise(badgesFirstName, badgesLastName, badgesBadges).map((entry) => {
                            return (
                                <tr>
                                    <td>{entry.rank}</td>
                                    <td>{entry.firstName} {entry.lastName}</td>
                                    <td>{entry.thing}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
    )
}