import { useRef, useState, React} from 'react'
import * as API from './API.js'
/* eslint-disable */

export class FormInput extends HTMLInputElement {
    render () {
        return (
            <div className="form_input">
                <input type={type} name={name} id={id} value={value} onInput={e => setValue(e.target.value)} placeholder={placeholder} required={required} />
            </div>
        )
    }
}

export function FormInput( {type="text", name, id=name, value="", setValue, placeholder, required=true }) {
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} value={value} onInput={e => setValue(e.target.value)} placeholder={placeholder} required={required} />
        </div>
    )
}

export function StaticTable({id, headers, width, data}) {
    const total = width.reduce((a, b) => a + b, 0);
    const normalised = width.map((w) => w / total * 100);
    return (
        <div className="table_container" id={id}>
            <table>
                <tr>
                    {headers.map((header, i) => (
                        <th style={{width: normalised[i] + '%'}}>{header}</th>
                    ))}
                </tr>
                {data.map((row) => (
                    <tr>
                        {row.map((cell, i) => (
                            <td style={{width: normalised[i] + '%'}}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export function Resize(element) {
    element.style.height = "0px"
    element.style.height = (element.scrollHeight) + "px";
}

export function handler(e, setValue, elem) {
    setValue(e.target.value);
    Resize(document.getElementById(elem));
}

export function TextArea({name, id=name, value="", setValue, placeholder, style, required=true}) {
    return (
        <div className="form_input">
                <textarea id = {id} value = {value} onInput={e => handler(e, setValue, id)} placeholder={placeholder} style={style} required={required}/>
        </div>
    )
}

export function MCQInput( {name, id=name, value="", content=value, onClick}) {
    return (
        <button name={name} id={id} value={value} className='action_button animated_button mcq_button' onClick={onClick}><span>{content}</span></button>
    )
}

export function select(choice, container) {
    // Conversion to array adapted from: https://stackoverflow.com/questions/5158338/how-to-convert-a-collection-to-an-array-in-javascript
    const children = Array.from(container.children);
    children.forEach((child) => {
        if (child === choice) {
            child.classList.add('selected_mcq_button');
        } else {
            child.classList.remove('selected_mcq_button');
        }
    })
}

export function Loader() {
    return (
        <div>
            // TODOM loader here
        </div>
    )
}

export function Home({MainContent, SSelected=null, MSelected=null, promise=Promise.resolve(), isProblem=false}) {
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
                <SideContainer name={user.current.firstName + " " + user.current.lastName} exp={user.current.xp} selected={SSelected} isAdmin={user.current.account === 'admin'} isProblem={isProblem}/> 
                <MainContainer MainContent={MainContent} selected={MSelected}/>
            </>
            }
        </div>
    ) 
}

export function SideContainer({name, exp, selected, isAdmin, isProblem}) {
    return (
        <div id = "side_container">
        <div className="vertical_center horizontal_center nav_bar">
            <button className="logo_container" onClick={() => window.location.href = 'home'} 
                    style={{padding: '0px', background: 'transparent'}}>
                <img src = {(isProblem ? "." : "") + "./Assets/Logo/dark.svg"} alt=''/>
            </button>
        </div>
        <div id = "user" className = "main_content" style={{marginTop: 'clamp(3px, 5vh, 12px)'}}>
            <div id="profile" style={{display: 'flex', columnGap: 'clamp(3px, 3vw, 12px)', paddingLeft: '1vw'}}>
                <img src={(isProblem ? "." : "") + "./Assets/Miscelaneous/blank_profile.svg"} id="profile_pic" alt=''/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <a href='dashboard' style={{fontWeight: 700}}>{name}</a>
                    <p style={{fontSize: '14px', fontWeight: 300}}>{exp} Exp</p>
                </div>
            </div>
            <div id = "sidebar_buttons">
                <SideButton contents={"Account\n Dashboard"} onClick={() => window.location.href='dashboard'} highlighted={selected == "dashboard"}/>
                <SideButton contents='Tournaments' onClick={() => window.location.href='tournaments'} highlighted={selected == "tournaments"}/>
                <SideButton contents={'Create/Assess\nProblems'} onClick={() => window.location.href='createassessprobems'} highlighted={selected == "createassessprobems"} shown={isAdmin}/>
                <SideButton contents='Leaderboards' onClick={() => window.location.href='leaderboards'} highlighted={selected == "leaderboards"}/>
                <SideButton contents='Forum Posts' onClick={() => window.location.href='posts'} highlighted={selected == "posts"}/>
                <SideButton contents='Report Bugs' onClick={() => window.location.href='bugs'} highlighted={selected == "bugs"}/>
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
                <button className={"animated_button nav_button " + (selected == "Home" ? "selected_button" : "")} onClick={() => window.location.href='home'}>
                    <span>Home</span>
                </button>
                <button className={"animated_button nav_button " + (selected == "Problems" ? "selected_button" : "")} onClick={() => window.location.href='problems'}>
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

export function SideButton({contents, onClick, highlighted, shown}) {
    return (
        <button className={"side_button " + (highlighted ? "selected_side_button" : "")} onClick={onClick} style={{shown} ? {display: "visible"} : {display: "hidden"}}>
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