import { useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
export default function Leaderboard() {
    const xp = useRef(null);
    const badges = useRef(null);
    
    const promise = API.leaderboard(template.getCookie('token'))
    promise.then((resp) => {
        xp.current = resp.reply.xp;
        badges.current = resp.reply.badges;
    })
    return (
        < template.Home MainContent={() => (<MainContent expLeaderboards={xp.current} badgesLeaderboards={badges.current} />)} SSelected={'leaderboards'} promise={promise} /> 
    ) 
}

export function MainContent({expLeaderboards, badgesLeaderboards}) { 
    return (<>
        <div className='section'>
            <h1>Exp Leaderboard</h1>
            <template.StaticTable id="expLeaderboards" headers={['Rank', 'Name', 'Exp']} width={[1,4,4]} data={expLeaderboards.map(
                (entry, i) => ([i + 1, String(entry.firstName + " " + entry.lastName), entry.xp]))} />
        </div>
        <div className='section'>
        <h1>Badges Leaderboard</h1>
        <template.StaticTable id="badgesLeaderboards" headers={['Rank', 'Name', 'Badges']} width={[1,2,6]} data={badgesLeaderboards.map(
            (entry, i) => ([i + 1, String(entry.firstName + " " + entry.lastName), (
                <div className='badges_container' style={{overflowX:"auto"}}>
                    {entry.badges.map((badge) => (
                        <div className='badge'>
                            <img alt="" src= {"../../Assets/Badges/" + badge.replaceAll(' ', '') + ".svg"}/>
                            <p>{badge}</p>
                        </div>
                    ))}
                </div>
            )]))} />
        </div>
    </>)
}