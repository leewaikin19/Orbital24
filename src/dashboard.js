/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Dashboard() {
    const solvedProblems = useRef(null);
    const pastTournaments = useRef(null);
    const pendingSubmissions = useRef(null);
    const user = useRef(null);
    const promise1 = API.dashboard(template.getCookie('token'))
    const promise2 = API.getAllProblems(template.getCookie('token'))
    const promise3 = API.getAllTournaments(template.getCookie('token'))
    const promise4 = API.getOwnPendingSubmissions(template.getCookie('token'))
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
        promise4.then(resp4 => {
            // find pending submissions
            pendingSubmissions.current = resp4.reply;
        })
    })
    const promise = Promise.all([promise1, promise2, promise3, promise4])
    return (
        < template.Home MainContent={() => (<MainContent pendingSubmissions={[]} solvedProblems={solvedProblems.current} tournaments={pastTournaments.current} user={user.current} />)} SSelected={'dashboard'} promise={promise} />
    ) 
}

function MainContent({pendingSubmissions, solvedProblems, tournaments, user}) {
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
            <div className='section'>
                <h1>Pending Submissions</h1>
                <template.StaticTable id="solved_problems" headers={['Problem Title', 'Exp']} width={[7,1]} data={pendingSubmissions.map(
                    (problem) => ([<><a href={'problems/' + problem.id}>{problem.title}</a> <img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".svg"}></img></>, problem.xp]))} />
            </div>
            <div className='section'>
                <h1>Solved Problems</h1>
                <template.StaticTable id="solved_problems" headers={['Problem Title', 'Exp']} width={[7,1]} data={solvedProblems.map(
                    (problem) => ([<><a href={'problems/' + problem.id}>{problem.title}</a> <img height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".svg"}></img></>, problem.xp]))} />
            </div>
            <div className='section'>
                <h1>Past Tournaments</h1>
                <template.StaticTable id="past_tournaments" headers={['Tournament', 'Exp']} width={[7,1]} data={tournaments.map(
                    (tournament) => ([<a href="tournaments">{tournament.title}</a>, tournament.xp]))} />
            </div>
            <div className='section'>
                <h1>Badges</h1>
                <div className='badges_container'>
                    {user.badges.map((badge) => {
                        return(
                            <div style={{width:"8em"}} className='badge'>
                                <img style={{height:"8em", marginBottom:"2vh"}} src= {"../../Assets/Badges/" + badge.replaceAll(' ', '') + ".svg"}/>
                                <b style={{wordWrap:"normal", textAlign:"center"}}>{badge}</b>
                            </div>
                    )})}
                </div>
            </div>
                <div className='section'>
                    <h1>Change Account Details</h1>
                    <div className="form_container">
                        <form action=''>
                            <template.MultiFormInput name={['firstName', 'lastName']} value={[firstName, lastName]} setValue={[setFirstName, setLastName]} placeholder={['First Name','Last Name']}/>
                            <template.FormInput type="email" name='email' value={email} setValue={setEmail} placeholder='Email'/>
                            <template.FormInput name='username' value={username} setValue={setUsername} placeholder='Username'/>
                            <button className="action_button animated_button" onClick={() => {
                                const dict = {'firstName': {firstName}, 'lastName': {lastName}, 'email': {email}, 'username': {username}}
                                API.updateUser(template.getCookie('token'), dict);
                            }}>
                                <i className="fa-solid fa-check"></i>{" "}
                                <span>Confirm Details</span>
                            </button>
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