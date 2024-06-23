/* eslint-disable */

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
        < template.Home MainContent={() => (<MainContent solvedProblems={[]} pendingSubmissions={[]} tournaments={[]} badges={[]} />)} SSelected={'dashboard'} promise={promise} />
    ) 
}

function MainContent({solvedProblems, pendingSubmissions, tournaments, badges}) {
    function entry({desc, exp}) {
        return(
            <tr>
                <td>
                    <a href='home'><span>{desc}</span></a>
                </td>
                <td>
                    {exp}
                </td>
            </tr>
        )
    }

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    function updatePassword() {
        if(password1 === password2) {
            API.updateUser(template.getCookie('token'), {'password': {password1}}); // TODO @LWK19 The "" account is now defunct becoz of this. Can help fix? Does the update need to have every field too?
        } else {}
    }

    return (
        <>
        
                <div className='section table_container'>
                    <h1>Solved Problems</h1>
                    <table id='solvedProblemsTable'>
                        <tr>
                            <th>Problem Title</th>
                            <th>Exp</th>
                        </tr>
                        {pendingSubmissions.map((problem) => entry(problem.title, problem.exp))}
                        {solvedProblems.map((problem) => entry(problem.title, problem.exp))}
                    </table>
                </div>
                <div className='section table_container'>
                    <h1>Past Tournaments</h1>
                    <table>
                        <tr>
                            <th>Tournaments</th>
                            <th>Exp</th>
                        </tr>
                        {tournaments.map((tournament) => entry(tournament.title, tournament.exp))}
                    </table>
                </div>
                <div className='section'>
                    <h1>Badges</h1>
                    <div className='badges_container' style={{overflowX:"scroll"}}>
                        {badges.map((badge) => (
                            <div className='badge'>
                                <img src= {{badge} + ".svg"}/>
                            </div>
                        ))}
                    </div>
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

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <button className="action_button animated_button" type="button" onClick={() => {
                                    const dict = {'firstName': {firstName}, 'lastName': {lastName}, 'email': {email}, 'username': {username}}
                                    API.updateUser(template.getCookie('token'), dict);
                                }}>
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
                            <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Enter New Password'/>
                            <template.FormInput type="password" name='password2' value={password2} setValue={setPassword2} placeholder='Reenter New Password'/>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                                <button className="action_button animated_button" type="button" onClick={() => updatePassword()}>
                                    <i class="fa-solid fa-lock"></i>{" "}
                                    <span>Update Password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </>
    )
}