import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Dashboard() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent solvedProblems={"temp"} pendingSubmissions={user.current.pendingSubmissions} tournaments={user.current.tournaments} badges={user.current.achievement} />)} SSelected={'tournaments'} promise={promise} />
    ) 
}

function MainContent({solvedProblems, pendingSubmissions, tournaments, badges}) {
    function row({desc, exp}) {
        <tr>
            <td>
                <a href='home'><span>{desc}</span></a>
            </td>
            <td>
                {exp}
            </td>
        </tr>
    }

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <>
        
                <div className='section table_container'>
                    <h1>Solved Problems</h1>
                    <table>
                        <tr>
                            <th>Problem Title</th>
                            <th>Exp</th>
                        </tr>

                        {/* for (let i = 0; i < solvedProblems.length; i++) {
                            {row(solvedProblems[i])}; //TODO solve when the "problem" object is clearly defined.
                        } */}

                        {/* for (let i = 0; i < pendingSubmissions.length; i++) {
                            {row(pendingSubmissions[i])}; //TODO solve when the "problem" object is clearly defined.
                        } */}
                        
                    </table>
                </div>
                <div className='section table_container'>
                    <h1>Past Tournaments</h1>
                    <table>
                        <tr>
                            <th>Tournaments</th>
                            <th>Exp</th>
                        </tr>
                        {/* for (let i = 0; i < tournaments.length; i++) {
                            {row(tournaments[i])}; //TODO solve when the "tournament" object is clearly defined.
                        } */}
                    </table>
                </div>
                <div className='section'>
                    <h1>Exp Progression</h1>
                    {/* TODO decide if we still want to do this */}
                </div>
                <div className='section'>
                    <h1>Longest Streak</h1>
                    {/* TODO decide if we still want to do this */}
                </div>
                <div className='section'>
                    <h1>Badges</h1>
                    {/* for (let i = 0; i < badges.length; i++) {
                        <img src={badges[i].img} alt=''/> //TODO solve when the "badge" object is clearly defined.
                    } */}
                </div>
                <div className='section'>
                    <h1>Change Account Details</h1>
                    <div className="form_container">
                        <form action=''>
                            <div style={{display: 'flex', flexDirection: 'row', columnGap: "clamp(3px, 3vw, 12px)"}}>
                                <template.FormInput name='firstName' value={firstName} setValue={setFirstName} placeholder='First Name'/>
                                <template.FormInput name='lastName' value={lastName} setValue={setLastName} placeholder='Last Name'/>
                            </div>
                            <template.FormInput type="email" name='email' value={email} setValue={setEmail} placeholder='Email'/>
                            <template.FormInput name='username' value={username} setValue={setUsername} placeholder='Username'/>
                            <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Password'/>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <button className="action_button animated_button" type="button">
                                    <i class="fa-solid fa-check"></i>{" "}
                                    <span>Confirm Details</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='section'>
                    <h1>Update Password</h1> 
                    {/* TODO @lwk19 hehe */}
                    <div className="form_container">
                        <form action=''>
                            <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Old Password'/>
                            <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='New Password'/>
                            <template.FormInput type="password" name='password1' value={password2} setValue={setPassword1} placeholder='Reenter New Password'/>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <button className="action_button animated_button" type="button">
                                    <i class="fa-solid fa-lock"></i>{" "}
                                    <span>Update Passowrd</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </>
    )
}