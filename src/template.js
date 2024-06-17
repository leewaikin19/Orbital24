import * as React from 'react'
/* eslint-disable */
export function Form_input( {type="text", name, id=name, value="", setValue, placeholder, required=true }) {
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} value={value} onInput={e => setValue(e.target.value)} placeholder={placeholder} required={required} style={{margin: "clamp(3px, 1vmin, 12px) 0px"}}/>
        </div>
    )
}

export function Loader() {
    return (
        <div>
            loader here
        </div>
    )
}

export function Bar({dir}) {
    return (
        <div className={"side_bar " + (dir === 'left' ? "push_left" : "push_right")}></div>
    )
}

export function SideButton({contents, onClick, selected=false}) {
    return (
        <button className={"side_button " + (selected ? "selected_side_button" : "")} onClick={onClick}>
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