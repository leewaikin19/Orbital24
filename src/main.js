import { useState } from 'react'
import * as template from "./template.js"
import * as API from "./API.js"

const SIGNUP_LOGIN = 0;
const FORGOT_PW = 1;
const FORGOT_PW_LANDING = 2;

export default function Main() {
    const [triggerError, setTriggerError] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [onClickAction, setOnClickAction] = useState(()=>()=>null);
    const [page, setPage] = useState(SIGNUP_LOGIN);

    const popup = {
        'trigger': setTriggerError,
        'setMsg': setPopupMsg,
        'setTitle': setPopupTitle,
        'setOnClickAction': setOnClickAction
    }
    

    function renderPage() {
        switch (page) {
            case SIGNUP_LOGIN: return <SignupLogin setPage={setPage} popup={popup}/>
            case FORGOT_PW: return <Forgotpw setPage={setPage} popup={popup}/>
            case FORGOT_PW_LANDING: return <Forgotpwlanding setPage={setPage} popup={popup} />
            default: return null
        }
    }
    return (
        <div className="outside_root root">
            <template.Bar dir='left' />
            <div className="main_container">
                <div className="main_logo">
                    <img src="./Assets/Logo/dark.svg" alt="Logo"></img>
                </div>
                {renderPage()}
            </div>
            <template.Bar dir='right' />
            <template.Popup name='error_popup' title={popupTitle} content={popupMsg} trigger={triggerError} setTrigger={setTriggerError} onClickAction={onClickAction}/>

        </div>
    )

}

function SignupLogin({ setPage, popup }) {
    const [loginSelected, setLoginSelected] = useState(true);
    return (
        <div style={{ width: '100%' }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}>
                <button id="signup_btn"
                    className={"top_button animated_button " +
                        (loginSelected ? "unselected_button" : "selected_button")}
                    onClick={() => setLoginSelected(false)}>
                    <span>Sign Up</span>
                </button>
                <button id="login_btn"
                    className={"top_button animated_button " +
                        (loginSelected ? "selected_button" : "unselected_button")}
                    onClick={() => setLoginSelected(true)}>
                    <span>Log In</span>
                </button>
            </div>
            <div id="outer_form_container">
                {loginSelected ? <Login setPage={setPage} popup={popup} /> : <Signup popup={popup}/>}
            </div>
        </div>
    )
}

export function Login({ setPage, popup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    document.title = 'Signup/Login';

    async function clickLogin() {
        if (username === "" || password === "") {
            popup.setTitle("Empty Username or Password");
            popup.setMsg("Please enter a valid username and password.");
            popup.trigger(true)
            return;
        } else {
            const resp = await API.login(username, password);
            if (resp.success) {
                template.setCookie('token', resp.reply.token)
                window.location.href = 'home';
            } else if(resp.msg === "Wrong Username" || resp.msg === "Wrong Password"){                
                document.getElementById('incorrect').style.color = 'var(--red)';
                document.getElementById('incorrect').innerHTML = 'Incorrect username or password';
            } else {
                template.handleErrors(resp.msg, popup);
            }
        }
    }
    function keyPress(e) {
        if (e.key === 'Enter') {
            clickLogin();
        }
    }

    return (
        <div style={{width:"100%"}}>
            <form>
                <template.FormInput name='username' id='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' onKeyDown={keyPress}/>
                <template.FormInput type='password' name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' onKeyDown={keyPress}/>
                <template.ActionButton icon="fa-solid fa-arrow-right-from-bracket" content="Click to Log In" onClickAction={clickLogin}/>
                <p className="error unselectable" id="incorrect">Please fill out all the fields</p>
            </form>
        </div>
    )
}

export function Signup({popup}) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    document.title = 'Signup/Login';

    async function clickSignup() {
        if (username === "" || firstName === "" || lastName === "" || email === "" || password1 === "" || password2 === "") {
            popup.setTitle("Empty Fields");
            popup.setMsg("Please fill in all details.");
            popup.trigger(true)
        } else if (password1 === password2) {
            document.getElementById('unequal').style.color = 'var(--grayest)';
            document.getElementById('password2').style.border = '2px solid var(--grayer)';
            const resp = await API.signup(firstName, lastName, email, username, password1);
            if (resp.success) {
                template.setCookie('token', resp.reply.token)
                window.location.href = 'home';
            } else {
                template.handleErrors(resp.msg, popup);
            }
        } else {
            document.getElementById('unequal').style.color = 'var(--red)';
            document.getElementById('password2').style.border = '2px solid var(--red)';
            document.getElementById('password2').focus();
        }
    }

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            clickSignup();
        }
    })

    return (
        <div style={{width:"100%"}}>
            <form className="section" action='signup'>
                <template.MultiFormInput name={['firstName', 'lastName']} value={[firstName, lastName]} setValue={[setFirstName, setLastName]} placeholder={['First Name','Last Name']}/>
                <template.FormInput type="email" name='email' id='email' value={email} onInput={e => setEmail(e.target.value)} placeholder='Email'/>
                <template.FormInput name='username' id='username' value={username} onInput={e => setUsername(e.target.value)} placeholder='Username'/>
                <template.FormInput type="password" name='password1' id='password1' value={password1} onInput={e => setPassword1(e.target.value)} placeholder='Password'/>
                <template.FormInput type="password" name='password2' id='password2' value={password2} onInput={e => setPassword2(e.target.value)} placeholder='Re-Enter Password'/>
                <template.ActionButton icon="fa-solid fa-user-plus" content="Click to Sign Up" onClickAction={clickSignup}/>
            </form>
            <p className="error unselectable" id="unequal">Passwords do not match</p>
        </div>
    )
}
    
function Forgotpw({ setPage, popup }) {
    document.title = 'Forgot Password';
    const [email, setEmail] = useState("");

    function handleForgotPw() {
        setPage(FORGOT_PW_LANDING);
    }

    return (
        <div style={{ width: '100%' }}>
            <div id="outer_form_container">
                <div style={{width:"100%"}}>
                    <form action="signup()">
                        <p>Please enter your email address.</p>
                        <template.FormInput type='email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                        <div className="smalllink">
                            <div onClick={() => setPage(SIGNUP_LOGIN)}>
                                <i className="fa-solid fa-caret-left"></i>
                                <span>Back to Sign Up/Login</span>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                            <button className="animated_button action_button"
                                onClick={handleForgotPw}>
                                <i className="fa-regular fa-envelope"></i>{" "}
                                <span>Submit Email Address</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function Forgotpwlanding({ setPage }) {
    document.title = 'Forgot Password';
    return (
        <div style={{ width: '100%' }}>
            <div id="outer_form_container">
                <div style={{width:"100%"}}>
                    <p>Feature to be implemented soon.</p>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <button className="animated_button action_button"
                            onClick={() => setPage(SIGNUP_LOGIN)}>
                            <i className="fa-solid fa-caret-left"></i>
                            <span>Back to Sign Up/Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


