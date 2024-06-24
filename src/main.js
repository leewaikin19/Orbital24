/* eslint-disable */
import { useState } from 'react'
import * as template from "./template.js"
import * as API from "./API.js"

const SIGNUP_LOGIN = 0;
const FORGOT_PW = 1;
const FORGOT_PW_LANDING = 2;

export default function Main() {
    
    const [page, setPage] = useState(SIGNUP_LOGIN);

    function renderPage() {
        switch(page) {
            case SIGNUP_LOGIN: return <SignupLogin setPage={setPage} />
            case FORGOT_PW: return <Forgotpw setPage={setPage} />
            case FORGOT_PW_LANDING: return <Forgotpwlanding setPage={setPage}/>
            default: return null
        }
    }
    return (
        <div className="outside_root root">
            <template.Bar dir='left'/>
            <div className="main_container">
                <div className="main_logo">
                    <img src="./Assets/Logo/dark.svg" alt="Logo"></img>
                </div>
                {renderPage()}
            </div>
            <template.Bar dir='right'/>
            
        </div>
    )
    
}

function SignupLogin({setPage}) {
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
                { loginSelected ? <Login setPage={setPage} /> : <Signup/> }
            </div>
        </div>
    )
}

function Login({setPage}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    document.title = 'Signup/Login';

    async function clickLogin() {
        const resp = await API.login(username, password);
        if (resp.success) {
            template.setCookie('token', resp.reply.token)
            window.location.href = 'home';
        } else {
            template.handleErrors(resp.msg);
        }
    }

    return (
        <div className="form_container">
            <form>
                <template.FormInput name='username' value={username} setValue={setUsername} placeholder='Username'/>
                <template.FormInput type='password' name='password' value={password} setValue={setPassword} placeholder='Password'/>
                <div className="smalllink">
                    <div onClick={() => setPage(FORGOT_PW)}>
                        <span>Forgot Password?</span>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button action_button" type="button" onClick={clickLogin}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                        <span>Log In</span>
                    </button>
                </div>
                <div className="error" id="incorrect"></div>
            </form>
        </div>
    )
}

function Signup() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    document.title = 'Signup/Login';

    async function clickSignup() {
        if(password1 === password2) {
            const resp = await API.signup(firstName, lastName, email, username, password1);
            if (resp.success) {
                template.setCookie('token', resp.reply.token)
                window.location.href = 'home';
            } else {
                template.handleErrors(resp.msg);
            }
        } else {
            // TODOM message to user if password no match
        }
    }
    return (
        <div className="form_container">
            <form action='signup'>
                <div style={{display: 'flex', flexDirection: 'row', columnGap: "clamp(3px, 3vw, 12px)"}}>
                    <template.FormInput name='firstName' value={firstName} setValue={setFirstName} placeholder='First Name'/>
                    <template.FormInput name='lastName' value={lastName} setValue={setLastName} placeholder='Last Name'/>
                </div>
                <template.FormInput type="email" name='email' value={email} setValue={setEmail} placeholder='Email'/>
                <template.FormInput name='username' value={username} setValue={setUsername} placeholder='Username'/>
                <template.FormInput type="password" name='password1' value={password1} setValue={setPassword1} placeholder='Password'/>
                <template.FormInput type="password" name='password2' value={password2} setValue={setPassword2} placeholder='Re-Enter Password'/>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button action_button" type="button" onClick={clickSignup}>
                        <i className="fa-solid fa-user-plus"></i>{" "}
                        <span>Sign Up</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

function Forgotpw({setPage}) {
    document.title = 'Forgot Password';
    const [email, setEmail] = useState("");

    function handleForgotPw() {
        setPage(FORGOT_PW_LANDING);
        // TODOM handle forgot pw
    }

    return (
        <div style={{ width: '100%' }}>
            <div id="outer_form_container">
                <div id="forgot_pw" className="form_container">
                    <form action="signup()">
                        Please enter your email address.
                        <template.FormInput type='email' name='email' value={email} setValue={setEmail} placeholder='Email'/>
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

function Forgotpwlanding({setPage}) {
    document.title = 'Forgot Password';
    return (
        <div style={{ width: '100%' }}>
            <div id="outer_form_container">
                <div id="forgot_pw" className="form_container">
                    Check your inbox for the instructions to reset your password.
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
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


