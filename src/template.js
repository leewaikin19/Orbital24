import * as React from 'react'

export function form_input(type, name, id, value, setValue, placeholder, required=true) {
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} value={value} onInput={e => setValue(e.target.value)} placeholder={placeholder} required={required}/>
        </div>
    )
}

export function left_bar() {
    return (
        <div className="side_bar push_left"></div>
    )
}

export function right_bar() {
    return (
        <div className="side_bar push_right"></div>
    )
}
