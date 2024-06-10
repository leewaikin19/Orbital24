import * as React from 'react'
import * as template from "./template.js"

export default function Forgotpw() {
    document.title = 'Forgot Password';

    return (
        <div className='root'>
            {template.left_bar()}
            <div className="main_container">
                <div className="main_logo">
                    <img src="./Assets/Logo/dark.svg" alt="Logo"></img>
                </div>
                <div style={{ width: '100%' }}>
                    <div id="outer_form_container">
                        <div id="forgot_pw" className="form_container">
                            <form action="signup()">
                                Please enter your email address.
                                {template.form_input('email', 'email', 'email', 'Email', true)}
                                <div className="smalllink">
                                    <a href="index">
                                        <i className="fa-solid fa-caret-left"></i>
                                        <span>Back to Sign Up/Login</span>
                                    </a>
                                </div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <button className="animated_button highlighted_button"
                                        onClick={() => window.location.href='forgotpwlanding'}>
                                        <i className="fa-regular fa-envelope"></i>{" "}
                                        <span>Submit Email Address</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {template.right_bar()}
        </div>
    )
}