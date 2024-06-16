import * as React from 'react'
//import * as template from "./template.js"

export default function Problems() {
    return (
        <div className='root'>
            {side_container()}
            {main_container()}
        </div>
    )
}

function side_container() {
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
                    <a href='home' style={{fontWeight: 700}}>Username</a>
                    <p style={{fontSize: '14px', fontWeight: 300}}>Rating</p>
                </div>
            </div>
            <div id = "sidebar_buttons">
                {side_button('Account\nDashboard', () => window.location.href='dashboard')}
                {side_button('Tournaments', () => window.location.href='tournament')}
                {side_button('Create/Assess\nProblems', () => window.location.href='createassess')}
                {side_button('Leaderboards', () => window.location.href='leaderboard')}
                {side_button('Forum Posts', () => window.location.href='posts')}
                {side_button('Report Bugs', () => window.location.href='home')}
            </div>
        </div>
    </div>
    )
}

function main_container() {
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
                <div>
                    <div id = "problem_title">
                        Title Should Go Here
                        <a href=''>View Past Submissions</a>
                    </div>
                    <div id = "problem_desc">

                    </div>
                </div>
            </div>
        </div>
    )
}

function side_button(span, click) {
    return (
        <button className="side_button" onClick={click}>
            <span> {span} </span>
        </button>
    )
}

function impt_note(note) {
    return (
        <div className='impt_note'>
            <div className='impt_note_title'>
                Important Note!
            </div>
            <div className='impt_note_content'>
                <p>
                    {note}
                </p>
            </div>
        </div>
    )
}