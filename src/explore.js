
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Explore() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent problems={[]} />)} MSelected={'Problems'} promise={promise} />
    ) 
}


function MainContent({problems}) { 
    return (
        <div id = "main" className = "main_content">
            <h1>Explore Problems</h1>
            {problems.length > 0 ? (<table>
                    <tr>
                        <th>Problems</th>
                        <th>Difficulty</th>
                    </tr>
                    {problems.map(problem => {
                        <tr>
                            <td>{problem.title}</td> 
                            <td>{problem.diff}</td>
                        </tr>
                    })}
                </table>) : (<p>There are no problems yet. This only happens during development stage.</p>)}
        </div>
    )
}