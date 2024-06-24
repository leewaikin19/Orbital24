
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Explore() {
    const [isThisNeeded, setThis] = useState(true);
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
    console.log(problems)
    console.log(problems.map(x => x.title))
    return (
        <div id = "main" className = "main_content">
            <h1>Explore Problems</h1>
            {problems.length > 0 ? (<table>
                    <tr>
                        <th>Problems</th>
                    </tr>
                    {problems.map(problem => (
                        <tr>
                            <td><a href={'problems/' + problem.id}>{problem.title}</a></td>
                        </tr>
                    ))}
                </table>) : (<p>There are no problems yet. This only happens during development stage.</p>)}
        </div>
    )
}