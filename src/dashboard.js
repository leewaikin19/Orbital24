import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Dashboard() {
    const [, setLoading] = useState(true);
    const solvedProblems = useRef([]);
    const pastTournaments = useRef([]);
    const pendingSubmissions = useRef([]);
    const pendingSubmissionsProblems = useRef([]);
    const user = useRef(null);
    const promise1 = API.dashboard(template.getCookie('token'))
    const promise2 = API.getAllProblems(template.getCookie('token'))
    const promise3 = API.getAllTournaments(template.getCookie('token'))
    const promise4 = API.getOwnPendingSubmissions(template.getCookie('token'))
    const promise5 = promise1.then(async resp1 => {
        user.current = resp1.reply;
        promise2.then(async resp2 => {
            // find problems that are already solved
            solvedProblems.current = resp1.reply.problemsSolved.map(id => resp2.reply.find(x => x.id === id));
            return promise4.then(resp4 => {
                resp4.reply = resp4.reply.filter(x => x !== null)
                pendingSubmissions.current = resp4.reply.map(sub => resp2.reply.find(x => x.id === sub.questionID) ===undefined ? undefined : sub).filter(x => x !== undefined)
                pendingSubmissionsProblems.current = pendingSubmissions.current.map(sub => resp2.reply.find(x => x.id === sub.questionID)).filter(x => x !== undefined)
            })
       })
        promise3.then(resp3 => {
            // find past tournaments
            pastTournaments.current = resp1.reply.pastTournaments.map(id => resp3.reply.find(x => x.id === id));
        })
    })
    const promise = Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => setLoading(false))
    return (
        < template.Home MainContent={() => (<MainContent pendingSubmissions={pendingSubmissions.current} pendingSubmissionsProblems={pendingSubmissionsProblems.current} solvedProblems={solvedProblems.current} tournaments={pastTournaments.current} user={user.current} />)} SSelected={'dashboard'} promise={promise} />
    ) 
}

export function MainContent({pendingSubmissions, pendingSubmissionsProblems, solvedProblems, tournaments, user}) {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [triggerPassword, setTriggerPassword] = useState(false);
    console.log(tournaments)

    function updatePassword() {
        if(password1 === password2) {
            API.updateUser(template.getCookie('token'), {'password': password1}).then((resp) => {setTriggerPassword(true)}); 
            
        } else {}
    }
    return (
        <>
            <template.Popup name="update_user" title="Details Updated" content="Your account details have been successfully updated." trigger={triggerUpdate} setTrigger={setTriggerUpdate} />
            <template.Popup name="update_password" title="Password Updated" content="Your password has been successfully updated." trigger={triggerPassword} setTrigger={setTriggerPassword} />
        
            <div className='section'>
                <h1>Ungraded Submissions</h1>
                <template.StaticTable id="solved_problems" headers={['Problem Title', 'Submission Time']} width={[1,1]} data={pendingSubmissions.map(
                    (submissions, index) => ([<a href={'/problems/' + submissions.questionID}>{pendingSubmissionsProblems[index].title}</a>, <a href={'submission/' + submissions.id}>{new Date(submissions.datetime).toLocaleString()}</a>]))} />
            </div>
            <div className='section'>
                <h1>Solved Problems</h1>
                <template.StaticTable id="solved_problems" headers={['Problem Title', 'Exp']} width={[7,1]} data={solvedProblems.map(
                    (problem) => ([<div className='problem_flair'><a href={'problems/' + problem.id}>{problem.title}</a> <img alt="" height="25em" src={'../../Assets/Flairs/' + problem.difficulty + ".png"}></img></div>, problem.xp]))} />
            </div>
            { /*
            <div className='section'>
                <h1>Past Tournaments</h1>
                <template.StaticTable id="past_tournaments" headers={['Tournament', 'Exp']} width={[7,1]} data={tournaments.map(
                    (tournament) => ([<a href="tournaments">{tournament.title}</a>, tournament.xp]))} />
            </div>
            */}
            <div className='section'>
                <h1>Badges</h1>
                <div className='badges_container'>
                    {user.badges.map((badge) => {
                        return(
                            <div style={{width:"8em"}} className='badge'>
                                <img alt="" style={{height:"8em", marginBottom:"2vh"}} src= {"../../Assets/Badges/" + badge.replaceAll(' ', '') + ".svg"}/>
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
                        <template.FormInput type="email" name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
                        <template.FormInput name='username' id='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username'/>
                        <template.ActionButton icon="fa-solid fa-check" content="Click to Confirm Details" onClickAction={() => {
                            const dict = {'firstName': firstName, 'lastName': lastName, 'email': email, 'username': username}
                            API.updateUser(template.getCookie('token'), dict).then((resp) => {setTriggerUpdate(true)})
                        }}/>
                    </form>
                </div>
            </div>
            <div className='section'>
                <h1>Update Password</h1> 
                <div className="form_container">
                    <form action=''>
                        <template.FormInput type="password" name='password1' id='password1' value={password1} onChange={e => setPassword1(e.target.value)} placeholder='Enter New Password'/>
                        <template.FormInput type="password" name='password2' id='password2' value={password2} onChange={e => setPassword2(e.target.value)} placeholder='Reenter New Password'/>
                        <template.ActionButton icon="fa-solid fa-lock" content="Click to Update Password" onClickAction={updatePassword}/>
                    </form>
                </div>
            </div>
        </>
    )
}