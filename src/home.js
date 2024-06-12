import * as React from 'react'
//import * as template from "./template.js"

export default function Home() {
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
                {side_button('Account\nDashboard', () => window.location.href='')}
                {side_button('Tournaments', () => window.location.href='')}
                {side_button('Create/Assess\nProblems', () => window.location.href='')}
                {side_button('Leaderboards', () => window.location.href='')}
                {side_button('Forum Posts', () => window.location.href='')}
                {side_button('Report Bugs', () => window.location.href='')}
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
                <div className='table_container'>
                    <h1>Current Problems</h1>
                    <table>
                        <tr>
                            <th>Problem Title</th>
                            <th>Difficulty</th>
                        </tr>
                        <tr>
                            <td>Sample Title</td>
                            <td>4.5</td>
                        </tr>
                    </table>
                </div>
                <div className='table_container'>
                    <h1>Recommended Problems</h1>
                    <table>
                        <tr>
                            <th>Problem Title</th>
                            <th>Difficulty</th>
                        </tr>
                        <tr>
                            <td>Sample Title</td>
                            <td>4.5</td>
                        </tr>
                    </table>
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