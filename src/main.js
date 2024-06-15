import { useState } from 'react'
import Form_input from "./template.js"
import * as template from "./template.js"
import * as API from "./API.js"
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Main() {
    const [formContents, setFormContents] = useState(Login());
    const [loginSelected, setLoginSelected] = useState(true);
    const [signupSelected, setSignupSelected] = useState(false);
    document.title = 'Signup/Login';

    function toggleLogin(bool) {
        setLoginSelected(bool);
        setSignupSelected(!bool);
        setFormContents(bool ? Login() : Signup());
    }

    return (
        <div className="outside_root root">
            {template.left_bar()}
            <div className="main_container">
                <div className="main_logo">
                    <img src="./Assets/Logo/dark.svg" alt="Logo"></img>
                </div>
                <div style={{ width: '100%' }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}>
                        <button id="signup_btn" 
                            className={"top_button animated_button " + 
                                        (signupSelected ? "selected_button" : "unselected_button")}
                            onClick={() => toggleLogin(false)}>
                            <span>Sign Up</span>
                        </button>
                        <button id="login_btn" 
                            className={"top_button animated_button " + 
                                        (loginSelected ? "selected_button" : "unselected_button")}
                            onClick={() => toggleLogin(true)}>
                            <span>Log In</span>
                        </button>
                    </div>
                    <div id="outer_form_container">
                        {formContents}
                    </div>
                </div>
            </div>
            {template.right_bar()}
        </div>
    )
}



function Login() {
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");

    return (
        <div className="form_container">
            <form action='login'>
                {/*template.form_input("text", 'username', 'username', username, setUsername, 'Username', true)}
                {template.form_input("password", 'password', 'password', password, setPassword, 'Password', true)*/}
                <div className="smalllink">
                    <a href="forgotpw"><span>Forgot Password?</span></a>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button highlighted_button" onClick={() => window.location.href='home'}>
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
    //const [firstName, setFirstName] = useState("");
    //const [lastName, setLastName] = useState(0);
    //const [email, setEmail] = useState("");
    //const [username, setUsername] = useState("");
    //const [password1, setPassword1] = useState("");
    //const [password2, setPassword2] = useState("");


    async function clickSignup() {
        if("password1" === "password2") {
            const resp = await API.signup("firstName", "lastName", "email", "username", "password1");
            if (resp.success) {
                window.location.href = 'home';
            } else {
                handleErrors(resp.msg);
            }
        } else {
            // TODO password no match
        }
    }
    return (
        <div className="form_container">
            <form action='signup'>
                <div className="form_input" style={{display: 'flex', flexDirection: 'row', columnGap: "clamp(3px, 3vw, 12px)"}}>
                    {//template.form_input("text", 'firstName', "firstName", firstName, setFirstName, 'First Name')
                    }
                    {Form_input("text", 'firstName', "firstName", 'First Name')}
                    
                    {//template.form_input("text", 'lastName', "lastName", lastName, setLastName, 'Last Name')
                    }
                </div>
                {/*template.form_input("email", 'email', 'email', email, setEmail, 'Email')}
                {template.form_input("text", 'username', 'username', username, setUsername, 'Username')}
                {template.form_input("password", 'password1', 'password1', password1, setPassword1, 'Password')}
                {template.form_input("password", 'password2', 'password2', password2, setPassword2, 'Re-Enter Password')*/}
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button highlighted_button" onClick={clickSignup}>
                        <i className="fa-solid fa-user-plus"></i>{" "}
                        <span>Sign Up</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

function handleErrors(resp) {
    if (resp.msg === "Token Error") {
        window.location.href = "index";
        alert("Login timeout. Please sign in again.");
    } else {
        console.log(resp.msg);
    }
}
