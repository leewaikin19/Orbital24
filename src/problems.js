import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Problems() {
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
                <MainContainer problems={[]}/> 
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
                <template.SideButton contents={"Account\n Dashboard"} onClick={() => window.location.href='dashboard'}/>
                <template.SideButton contents='Tournaments' onClick={() => window.location.href='tournaments'}/>
                <template.SideButton contents={'Create/Assess\nProblems'} onClick={() => window.location.href='createassessprobems'}/>
                <template.SideButton contents='Leaderboards' onClick={() => window.location.href='leaderboards'}/>
                <template.SideButton contents='Forum Posts' onClick={() => window.location.href='posts'}/>
                <template.SideButton contents='Report Bugs' onClick={() => window.location.href='bugs'}/>
            </div>
        </div>
    </div>
    )
}


function MainContainer({problems}) { 

    return (
        <div id="main_container">
            <div className = "vertical_center nav_bar" style={{display: 'flex', justifyContent: 'end'}}>
                <input type="text" id="search_bar" placeholder="Search Problems..."/>
                <button className="animated_button nav_button" onClick={() => window.location.href='home'}>
                    <span>Home</span>
                    </button>
                <button className="animated_button selected_button nav_button" onClick={() => window.location.href='problems'}>
                    <span>Problems</span>
                    </button>
                <button className="animated_button nav_button" id="logout_button" onClick={() => window.location.href='index'}>
                    <span>Logout</span>
                    </button>
            </div>
            <div id = "main" className = "main_content">
                <>
                    <h1>Problem Title</h1>
                </>
                <>
                    <p>Problem Description</p>
                </>
                {impt_note({note: "This is an important note"})}
            </div>
        </div>
    )
}

function impt_note({note}) {
    return(
        <div className="impt_note">
            <div className='impt_note_title'>
                Important Note!
                <div className='impt_note_content'>
                {note}
                </div>
            </div>
        </div>
    )
}