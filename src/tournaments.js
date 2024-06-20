import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Tournaments() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return ( 
        < template.Home MainContent={() => (<MainContent problemset={[]} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({problemset}) { 
    return (
        <div className='section'>
            <h1>Tournament Problem Set</h1>
            {problemset.length > 0 ? (<table>
                <tr>
                    <th>Problem Set</th>
                </tr>
                {problemset.map(problem => {
                    <tr>
                        <td>{problem}</td> 
                        {/* TODO @LWK19 to be solved when problem object is clearly defined */}
                    </tr>
                })}
            </table>) : (<p>Tournament has not begun yet. Please come back later!</p>)}
        </div>
    )
}