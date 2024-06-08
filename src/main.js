import * as React from 'react'
import * as template from "./template.js"

export default function Main() {
    console.log("mainnnn")
    const [formContents, setFormContents] = React.useState(login());
    const [loginSelected, setLoginSelected] = React.useState(true);
    const [signupSelected, setSignupSelected] = React.useState(false);

    function toggleLogin(bool) {
        setLoginSelected(bool);
        setSignupSelected(!bool);
        setFormContents(bool ? login() : signup());
    }

    return (
        <div className="root">
            {side_bar()}
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
            {side_bar()}
        </div>
    )
}



function login() {
    return (
        <div id="signup_form" className="form_container">
            <form action='login'>
                {template.form_input("text", 'UserID', 'UserID', 'Username', true)}
                {template.form_input("password", 'password', 'password', 'Password', true)}
                <div className="smalllink">
                    <a href="forgotpw"><span>Forgot Password?</span></a>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button highlighted_button" onClick={() => window.location.href='home'}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> 
                        <span>Log In</span>
                    </button>
                </div>
                <div className="error" id="incorrect"></div>
            </form>
        </div>
    )
}

function signup() {
    return (
        <div id="signup_form" className="form_container">
            <form action='signup'>
                <div className="form_input" style={{display: 'flex', flexDirection: 'row', columnGap: "clamp(3px, 3vw, 12px)"}}>
                    {template.form_input("text", 'first_name', "firstName", 'First Name', true)}
                    {template.form_input("text", 'last_name', "lastName", 'Last Name', true)}
                </div>
                {template.form_input("email", 'email', 'email', 'Email', true)}
                {template.form_input("text", 'UserID', 'UserID', 'Username', true)}
                {template.form_input("password", 'password1', 'password1', 'Password', true)}
                {template.form_input("password", 'password2', 'password2', 'Re-Enter Password', true)}
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <button className="animated_button highlighted_button" onClick={() => window.location.href = 'home.html'}>
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Sign Up</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

function side_bar() {
    return (
        <div className="side_bar" style={{ backgroundPosition: "top left" }}></div>
    )
}
