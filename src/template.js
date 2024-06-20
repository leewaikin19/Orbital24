import { useRef, useState } from 'react'
import * as API from './API.js'
/* eslint-disable */
export function FormInput( {type="text", name, id=name, value="", setValue, placeholder, required=true }) {
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} value={value} onInput={e => setValue(e.target.value)} placeholder={placeholder} required={required} style={{margin: "clamp(3px, 1vmin, 12px) 0px"}}/>
        </div>
    )
}

export function Loader() {
    return (
        <div>
            // TODOM loader here
        </div>
    )
}

export function Home({MainContent, SSelected=null, MSelected=null, promise=Promise.resolve()}) {
    const [loading, setLoading] = useState(true);
    const user = useRef(null);
    
    API.dashboard(getCookie('token')).then((resp) => {
        if(resp.success){
            user.current = resp.reply;
            promise.then(() => setLoading(false));
        } else {
            handleErrors(resp.msg);
            return null;
        }
    })

    return (
        <div className='root'>
            {  loading ? <Loader/> : 
            <>
                <SideContainer name={user.current.firstName + " " + user.current.lastName} exp={user.current.exp} selected={SSelected} isAdmin={user.current.account === 'admin'}/> 
                <MainContainer MainContent={MainContent} selected={MSelected}/>
            </>
            }
        </div>
    ) 
}

export function SideContainer({name, exp, selected, isAdmin}) {
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
                    <a href='dashboard' style={{fontWeight: 700}}>{name}</a>
                    <p style={{fontSize: '14px', fontWeight: 300}}>{exp} Exp</p>
                </div>
            </div>
            <div id = "sidebar_buttons">
                {// TODOM selected param do highlighting here
                }
                <SideButton contents={"Account\n Dashboard"} onClick={() => window.location.href='dashboard'}/>
                <SideButton contents='Tournaments' onClick={() => window.location.href='tournaments'}/>
                {// TODOM Create/Assess problem should only be visible to admins
                }
                <SideButton contents={'Create/Assess\nProblems'} onClick={() => window.location.href='createassessprobems'}/>
                <SideButton contents='Leaderboards' onClick={() => window.location.href='leaderboards'}/>
                <SideButton contents='Forum Posts' onClick={() => window.location.href='posts'}/>
                <SideButton contents='Report Bugs' onClick={() => window.location.href='bugs'}/>
            </div>
        </div>
    </div>
    )
}

export function MainContainer({MainContent, selected}) {
    return (
        <div id="main_container">
            <div className = "vertical_center nav_bar" style={{display: 'flex', justifyContent: 'end'}}>
                <input type="text" id="search_bar" placeholder="Search Problems..."/>
                {// TODOM Create/Assess problem should only be visible to admins
                }
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
                <MainContent/>
            </div>
        </div>
    )
}

export function Bar({dir}) {
    return (
        <div className={"side_bar " + (dir === 'left' ? "push_left" : "push_right")}></div>
    )
}

export function SideButton({contents, onClick, selected=false}) {
    return (
        <button className={"side_button " + (selected ? "selected_side_button" : "")} onClick={onClick}>
            <span> {contents} </span>
        </button>
    )
}

export function setCookie(cname, value){
    document.cookie = cname + "=" + value + ";max-age=7200;path=/";
}

export function getCookie(cname) {
    cname += '='
    const cookies = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return null;
}

export function handleErrors(msg) {
    if (msg === "Token Error") {
        window.location.href = "index";
        alert("Login timeout. Please sign in again.");
    } else {
        console.log(msg);
    }
}