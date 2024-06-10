import * as React from 'react'
import * as template from "./template.js"

export default function Forgotpwlanding() {
    document.title = 'Signup/Login';

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
                            Check your inbox for the instructions to reset your password.
                            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <button className="animated_button highlighted_button" 
                                    onClick={() => window.location.href='index'}>
                                    <i className="fa-solid fa-caret-left"></i>
                                    <span>Back to Sign Up/Login</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {template.right_bar()}
        </div>
    )
}