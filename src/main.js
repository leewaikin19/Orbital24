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
        switch (page) {
            case SIGNUP_LOGIN: return <SignupLogin setPage={setPage} />
            case FORGOT_PW: return <Forgotpw setPage={setPage} />
            case FORGOT_PW_LANDING: return <Forgotpwlanding setPage={setPage} />
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

        </div>
    )

}

function SignupLogin({ setPage }) {
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
                {loginSelected ? <Login setPage={setPage} /> : <Signup />}
            </div>
        </div>
    )
}

function Login({ setPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    document.title = 'Signup/Login';

    async function clickLogin() {
        if (username === "" || password === "") {
            document.getElementById('incorrect').style.color = 'var(--red)';
            return;
        } else {
            const resp = await API.login(username, password);
            if (resp.success) {
                template.setCookie('token', resp.reply.token)
                window.location.href = 'home';
            } else {
                template.handleErrors(resp.msg);
                console.log(resp.msg)
                alert("asd")
                document.getElementById('incorrect').style.color = 'var(--red)';
                document.getElementById('incorrect').innerHTML = 'Incorrect username or password';
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
                <template.FormInput name='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' onKeyDown={keyPress}/>
                <template.FormInput type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' onKeyDown={keyPress}/>
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
                <p className="error" id="incorrect">Please fill out all the fields</p>
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
        if (username === "" || firstName === "" || lastName === "" || email === "" || password1 === "" || password2 === "") {
            document.getElementById('unequal').style.color = 'var(--red)';
            document.getElementById('unequal').innerHTML = 'Please fill out all fields';
        } else if (password1 === password2) {
            document.getElementById('unequal').style.color = 'var(--grayest)';
            document.getElementById('password2').style.border = '2px solid var(--grayer)';
            const resp = await API.signup(firstName, lastName, email, username, password1);
            if (resp.success) {
                template.setCookie('token', resp.reply.token)
                window.location.href = 'home';
            } else {
                template.handleErrors(resp.msg);
            }
        } else {
            document.getElementById('unequal').style.color = 'var(--red)';
            document.getElementById('password2').style.border = '2px solid var(--red)';
            document.getElementById('password2').focus();
        }
    }

    addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            clickSignup();
        }
    })

    return (
        <div style={{width:"100%"}}>
            <form className="section" action='signup'>
                <template.MultiFormInput name={['firstName', 'lastName']} value={[firstName, lastName]} onChange={[setFirstName, setLastName]} placeholder={['First Name','Last Name']}/>
                <template.FormInput type="email" name='email' value={email} onInput={e => setEmail(e.target.value)} placeholder='Email'/>
                <template.FormInput name='username' value={username} onInput={e => setUsername(e.target.value)} placeholder='Username'/>
                <template.FormInput type="password" name='password1' value={password1} onInput={e => setPassword1(e.target.value)} placeholder='Password'/>
                <template.FormInput type="password" name='password2' value={password2} onInput={e => setPassword2(e.target.value)} placeholder='Re-Enter Password'/>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button action_button" type="button" onClick={clickSignup}>
                        <i className="fa-solid fa-user-plus"></i>{" "}
                        <span>Sign Up</span>
                    </button>
                </div>
            </form>
            <p className="error unselectable" id="unequal">Passwords do not match</p>
        </div>
    )
}
    
function Forgotpw({ setPage }) {
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
                        <template.FormInput type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
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


