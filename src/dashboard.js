import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const user = useRef(null);

    async function getDashboard() {
        const resp = await API.dashboard(template.getCookie('token'))
        if(resp.success){
            user.current = resp.reply;
            setLoading(false);
        } else {
            template.handleErrors(resp.msg);
            return null;
        }
    }
    getDashboard();
    return (
        <div className='root'>
            { loading ? <template.Loader/> : 
             <> 
                <SideContainer name={user.current.firstName + " " + user.current.lastName} exp={user.current.exp}/> 
                <MainContainer solvedProblems={user.current.solvedProblems} pendingSubmissions={user.current.pendingSubmissions} tournaments={user.current.tournaments} badges={user.current.achievement}/> 
             </> }
        </div>
    ) 
}

function SideContainer({name, exp}) {
    return (
        <div id = "side_container">
        <div className="vertical_center horizontal_center nav_bar">
            <button className="logo_container" onClick={() => window.location.href = 'home'} 
                    style={{padding: '0px', background: 'transparent'}}>
                <img src = "./Assets/Logo/dark.svg" alt=''/>
            </button>
        </div>
        <div id = "user" className = "main_content" style={{marginTop: 'clamp(3px, 5vh, 12px)'}}>
            <div id="profile" style={{display: 'flex', columnGap: 'clamp(3px, 3vw, 12px)', paddingLeft: '1vw'}}>
                <img src="./Assets/Miscelaneous/blank_profile.svg" id="profile_pic" alt=''/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <a href='home' style={{fontWeight: 700}}>{name}</a>
                    <p style={{fontSize: '14px', fontWeight: 300}}>{exp} Exp</p>
                </div>
            </div>
            <div id = "sidebar_buttons">
                <SideButton contents={"Account\n Dashboard"} onClick={() => window.location.href='dashboard'}/>
                <SideButton contents='Tournaments' onClick={() => window.location.href='tournaments'}/>
                <SideButton contents={'Create/Assess\nProblems'} onClick={() => window.location.href='createassessprobems'}/>
                <SideButton contents='Leaderboards' onClick={() => window.location.href='leaderboards'}/>
                <SideButton contents='Forum Posts' onClick={() => window.location.href='posts'}/>
                <SideButton contents='Report Bugs' onClick={() => window.location.href='bugs'}/>
            </div>
        </div>
    </div>
    )
}

function MainContainer({solvedProblems, pendingSubmissions, tournaments, badges}) {
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
        <div id="main_container">
            <div className = "vertical_center nav_bar" style={{display: 'flex', justifyContent: 'end'}}>
                <input type="text" id="search_bar" placeholder="Search Problems..."/>
                <button className="animated_button selected_button nav_button" onClick={() => window.location.href='home'}>
                    <span>Home</span>
                    </button>
                <button className="animated_button nav_button" onClick={() => window.location.href='problems'}>
                    <span>Problems</span>
                    </button>
                <button className="animated_button nav_button" id="logout_button" onClick={() => window.location.href='index'}>
                    <span>Logout</span>
                    </button>
            </div>
            <div id = "main" className = "main_content">
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
                                <template.Form_input name='firstName' value={firstName} setValue={setFirstName} placeholder='First Name'/>
                                <template.Form_input name='lastName' value={lastName} setValue={setLastName} placeholder='Last Name'/>
                            </div>
                            <template.Form_input type="email" name='email' value={email} setValue={setEmail} placeholder='Email'/>
                            <template.Form_input name='username' value={username} setValue={setUsername} placeholder='Username'/>
                            <template.Form_input type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Password'/>
                            <template.Form_input type="password" name='password2' value={password2} setValue={setPassword2} placeholder='Re-Enter Password'/>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <button className="action_button animated_button" type="button">
                                    <i className="fa-solid fa-user-plus"></i>{" "}
                                    <span>Update Details</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SideButton({contents, onClick}) {
    return (
        <button className="side_button" onClick={onClick}>
            <span> {contents} </span>
        </button>
    )
}