import React, { useRef, useState, Component } from 'react'
import * as API from './API.js'

export class FormInput extends Component {
    render () {
        return (
            <div className="form_input">
                <input {...this.props}/>
            </div>
        )
    }
}

export function MultiFormInput({type=["text", 'text'], name, id=name, value, setValue, placeholder, required=[true, true]}) {
    return (
        <div className="form_input">
            {name.map((n, i) => (
                <input type={type[i]} name={n} id={id[i]} value={value[i]} onInput={e => setValue[i](e.target.value)} placeholder={placeholder[i]} required={required[i]} />
            ))}
        </div>
    )
}

export function ActionButton ({name, id=name, value="", icon = "", content=value, onClickAction = () => {}, disabled=false}) {
    return (
        <div id={id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button className="animated_button action_button" type="button" onClick={onClickAction} disabled = {disabled}>
                <i className={icon}></i>{" "}
                <span>{content}</span>
            </button>
        </div>
    )
}

export function StaticTable({id, headers, width, data}) {
    const total = width.reduce((a, b) => a + b, 0);
    const normalised = width.map((w) => w / total * 100);
    return (
        <div className="table_container" id={id}>
            <table>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th style={{width: normalised[i] + '%'}}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr>
                            {row.map((cell, i) => (
                                <td style={{width: normalised[i] + '%', verticalAlign:"middle"}}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function handler(e, setValue, elem) {
    setValue(e.target.value);
    elem = document.getElementById(elem);
    elem.style.height = "0px"
    elem.style.height = (elem.scrollHeight) + "px";
}

// Array updating mechanism adapted from https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
// It is then wrapped in the handler function.
export function ArrayTextAreaInputHandler (arr, setArr, index, field = "", value, elem = "") {
    setArr(arr.map((i, ind) => {
        if (ind === index) {
            if (field === "") {
                return value
            } else {
                return {...i, [field]: value}
            }
        } 
        else {
            return i
        }
    }))

    if (elem !== "") {
        elem = document.getElementById(elem);
        elem.style.height = "0px"
        elem.style.height = (elem.scrollHeight) + "px";
    }
}

export function TextArea({name, id=name, value="", setValue, placeholder, style, required=true}) {
    return (
        <div className="form_input">
            <textarea id = {id} value = {value} onInput={e => handler(e, setValue, id)} placeholder={placeholder} style={style} required={required}/>
        </div>
    )
}

export function MCQInput( {name, id=name, value="", content=value, onClick, preselected = false, disabled=false}) {
    return (
        <>
             <button name={name} id={id} value={value} className={'animated_button mcq_button ' + (preselected ? 'selected_mcq_button ' : '') + (disabled ? 'unselectable ' : '')} onClick={onClick} style={{marginBottom:"0.5em"}} disabled = {disabled}>{content}</button>
        </>
    )
}

export function GradeMCQInput( {name, id=name, value="", content=value, userAnswer = false, correctAnswer = null}) {
    return (
        <>
             <button name={name} id={id} value={value} className={'mcq_button ' + (userAnswer ? 'selected_mcq_button ' : '') + (correctAnswer !== null ? (correctAnswer === true ? 'green_button' : 'red_button') : '')} style={{marginBottom:"0.5em"}} disabled>{content}</button>
        </>
    )
}

export function GradeSRQInput({name, id=name, value="", setValue, correctAnswer = null}) {
    return (
        <>
            <FormInput name={name} id={id} value={value} onChange={setValue} className={correctAnswer !== null ? (correctAnswer === true ? "green_button" : "red_button") : ""} disabled = {true}/>
        </>
    )
}

export function select(choice, container) {
    // Conversion to array adapted from: https://stackoverflow.com/questions/5158338/how-to-convert-a-collection-to-an-array-in-javascript
    const children = Array.from(container.children);
    children.forEach((child) => {
        if (child === choice && !child.classList.contains('selected_mcq_button')) {
            child.classList.add('selected_mcq_button');
        } else if (child === choice && child.classList.contains('selected_mcq_button')) {
            child.classList.remove('selected_mcq_button');
        } else {
            child.classList.remove('selected_mcq_button');
        }
    })
}

export function Loader() {
    const dot = ((window.location.href.includes('rojike.pages.dev')
        ? window.location.href.split('rojiku.pages.dev').at(-1)
        : window.location.href.split('localhost').at(-1)).match(/\//g) || []).length - 1;
    return (
        <div style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"2em"}}>
            <img src={'./.'.repeat(dot)+'./Assets/Miscelaneous/blank_profile.svg'} alt='Loading...' height="250em"/>
            <h1>Loading...</h1>
        </div>
    )
}

// Popup code adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM. Inputs and structure are changed.
export function Popup({name, id = name, title, content = "", trigger, setTrigger, onClickAction = () => {}}) {
    return (trigger) ? (
        <div className='popup' id={id}>
            <div className='popup_content'>
                <div className='popup_header'>
                    <h2>{title}</h2>
                </div>
                <div className='popup_body'>
                    <p>{content}</p>
                </div>
                <div className='popup_footer'>
                    <button className='' onClick={() => {
                        setTrigger(false);
                        onClickAction()}}><span>Close</span></button>
                </div>
            </div>
        </div>
    ) : null
}

export function Home({MainContent, SSelected=null, MSelected=null, promise=Promise.resolve()}) {
    const [loading, setLoading] = useState(true);
    const user = useRef(null);
    const [triggerError, setTriggerError] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [onClickAction, setOnClickAction] = useState(()=>()=>null);

    const popup = {
        'trigger': setTriggerError,
        'setMsg': setPopupMsg,
        'setTitle': setPopupTitle,
        'setOnClickAction': setOnClickAction
    }
    
    API.dashboard(getCookie('token')).then((resp) => {
        if(resp.success){
            user.current = resp.reply;
            promise.then(() => {setLoading(false)});
        } else {
            handleErrors(resp.msg);
            return null;
        }
    })
    return (
        <div className='root'>
            {  loading ? <Loader/> : 
            <div className='outer_grid'>
                
                <NavBar selected={MSelected}/>
                <div className='inner_grid'>
                    <SideContainer name={user.current.firstName + " " + user.current.lastName} exp={user.current.xp} selected={SSelected} isAdmin={user.current.account === 'admin'}/> 
                    <MainContainer MainContent={MainContent} popup={popup} selected={MSelected}/>
                </div>
                <Popup name='error_popup' title={popupTitle} content={popupMsg} trigger={triggerError} setTrigger={setTriggerError} onClickAction={onClickAction}/>
            </div>
            }
        </div>
    ) 
}

export function SideContainer({name, exp, selected, isAdmin}) {
    return (
        <div id = "user" className = "main_content">
            <div id="profile">
                <img src={"/Assets/Miscelaneous/blank_profile.svg"} id="profile_pic" alt=''/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <a href='dashboard' style={{fontWeight: 700}}>{name}</a>
                    <p style={{fontSize: '14px', fontWeight: 300}}>{exp} Exp</p>
                </div>
            </div>
            <div id = "sidebar_buttons">
                <SideButton contents={"Account Dashboard"} onClick={() => window.location.href='/dashboard'} highlighted={selected === "dashboard"}/>
                <SideButton contents='Tournaments' onClick={() => window.location.href='/tournaments'} highlighted={selected === "tournaments"}/>
                <SideButton contents={'Create Problems'} onClick={() => window.location.href='/createassessproblems'} highlighted={selected === "createassessproblems"}/>
                <SideButton contents={'Grade Submissions'} onClick={() => window.location.href='/grade'} highlighted={selected === "grade"} shown = {isAdmin}/>
                <SideButton contents='Leaderboards' onClick={() => window.location.href='/leaderboards'} highlighted={selected === "leaderboards"}/>
                <SideButton contents='Forum Posts' onClick={() => window.location.href='/posts'} highlighted={selected === "posts"}/>
                <SideButton contents='Report Bugs' onClick={() => window.location.href='/bugs'} highlighted={selected === "bugs"}/>
            </div>
        </div>
    )
}

export function NavBar({selected}) {
    return (
    <div className='nav_bar'>
            <img src = {"/Assets/Logo/dark.png"} alt='' onClick={() => window.location.href = '/home'} style={{padding:"clamp(6px, 4vw, 18px)"}}/>
            <div style={{justifySelf:"end"}}>
                <button className={"nav_button " + (selected === "Home" ? "selected_button" : "animated_button")} onClick={() => window.location.href='/home'}>
                    <span>Home</span>
                </button>
                <button className={"nav_button " + (selected === "Problems" ? "selected_button" : "animated_button")} onClick={() => window.location.href='/problems'}>
                    <span>Problems</span>
                </button>
                <button className="animated_button nav_button" id="logout_button" onClick={() => window.location.href='/index'}>
                    <span>Logout</span>
                </button>
            </div>
        </div>)
}

export function MainContainer({MainContent, popup}) {
    return (
        <div id = "main" className = "main_content">
            <MainContent popup={popup}/>
        </div>
    )
}
    
export function Bar({dir}) {
    return (
        <div className={"side_bar " + (dir === 'left' ? "push_left" : "push_right")}></div>
    )
}

export function SideButton({contents, onClick, highlighted, shown=true}) {
    if (!shown) return null;
    return (
        <button className={"side_button " + (highlighted ? "selected_side_button" : "")} onClick={onClick}>
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
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return null;
}

export function handleErrors(msg, popup) {
    if (msg === "Token Error") {
        window.location.href = '/index'
    } else {
        popup.setMsg('An error has occurred: ' + msg)
        popup.setTitle("Error")
        popup.setOnClickAction(()=>()=>null)
        popup.trigger(true)
    }
}