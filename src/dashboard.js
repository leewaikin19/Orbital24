/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Dashboard() {
    const solvedProblems = useRef(null);
    const pastTournaments = useRef(null);
    const user = useRef(null);
    const promise1 = API.dashboard(template.getCookie('token'))
    const promise2 = API.getAllProblems(template.getCookie('token'))
    const promise3 = API.getAllTournaments(template.getCookie('token'))
    promise1.then(resp1 => {
        user.current = resp1.reply;
        promise2.then(resp2 => {
            // find problems that are already solved
            solvedProblems.current = resp1.reply.problemsSolved.map(id => resp2.reply.find(x => x.id === id));
        })
        promise3.then(resp3 => {
            // find past tournaments
            pastTournaments.current = resp1.reply.pastTournaments.map(id => resp3.reply.find(x => x.id === id));
        })
    })
    const promise = Promise.all([promise1, promise2, promise3])
    return (
        < template.Home MainContent={() => (<MainContent solvedProblems={solvedProblems.current} tournaments={pastTournaments.current} user={user.current} />)} SSelected={'dashboard'} promise={promise} />
    ) 
}

function MainContent({solvedProblems, tournaments, user}) {
    function entry(desc, exp, link) {
        return(
            <tr>
                <td>
                    <a href={link}><span>{desc}</span></a>
                </td>
                <td>
                    {exp}
                </td>
            </tr>
        )
    }

    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    function updatePassword() {
        if(password1 === password2) {
            API.updateUser(template.getCookie('token'), {'password': password1}); 
            
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
                        {
                            //TODOM why is pendingSubmissions under solved problems
                        }
                        {user.pendingSubmissions.map((problem) => entry(problem.title, problem.xp, 'problems/' + problem.id))}
                        {solvedProblems.map((problem) => entry(problem.title, problem.xp, 'problems/' + problem.id))}
                    </table>
                </div>
                <div className='section table_container'>
                    <h1>Past Tournaments</h1>
                    <table>
                        <tr>
                            <th>Tournaments</th>
                            <th>Exp</th>
                        </tr>
                        {tournaments.map((tournament) => entry(tournament.title, tournament.xp, 'tournaments'))}
                    </table>
                </div>
                <div className='section'>
                    <h1>Badges</h1>
                    <div className='badges_container' style={{overflowX:"scroll"}}>
                        {user.badges.map((badge) => {return(
                            <div className='badge'>
                                <img src= {{badge} + ".svg"}/>
                            </div>
                        )})}
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
                                    <i className="fa-solid fa-check"></i>{" "}
                                    <span>Confirm Details</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='section'>
                    <h1>Update Password</h1> 
                    <div className="form_container">
                        <form action=''>
                            <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Enter New Password'/>
                            <template.FormInput type="password" name='password2' value={password2} setValue={setPassword2} placeholder='Reenter New Password'/>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                                <button className="action_button animated_button" type="button" onClick={() => updatePassword()}>
                                    <i className="fa-solid fa-lock"></i>{" "}
                                    <span>Update Password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </>
    )
}