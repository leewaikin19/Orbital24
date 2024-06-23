import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Submissions() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent submissions={user.current.Submissions} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({submissions}) { 

    return (
        
                <div className='section'>
                    <h1>My Submissions</h1>
                    <table>
                        <tr>
                            <th>Submissions</th>
                        </tr>
                        {submissions.length > 0 ? submissions.map(sub => {
                            <tr>
                                <td>{sub}</td>
                            </tr>
                        }) : (
                            <tr style={{textAlign:"center"}}>
                                <td>No Submission Records Found</td>
                            </tr>
                            )}
                    </table>
                </div>
    )
}