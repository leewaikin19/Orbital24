import * as React from 'react'
import * as template from "./template.js"

export default function Otp() {
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
                        <div id="signup_form" class="form_container">
                            Enter the OTP sent to your email address here.
                            <form action="signup()">
                                <div className="form_input" id="otp_container" 
                                    style={{display: 'flex', flexDirection: 'row', columnGap: 'clamp(3px, 3vw, 12px)'}}>
                                    <input id="otp_input" type="text" pattern="[0-9]{6}" maxlength="6" required/>
                                </div>
                                <div className="smalllink">
                                    <a href="otp"><span>Didn't Receive the Email?</span></a>
                                </div>
                                <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                    <button className="animated_button highlighted_button" 
                                        onClick={() => window.location.href='home'}>
                                        <i className="fa-solid fa-check"></i> 
                                        <span>Verify OTP</span>
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