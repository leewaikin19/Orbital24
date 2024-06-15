import { useState } from 'react'
export default function Form_input(type, name, id, placeholder, required=true) {
    const [value, setValue] = useState(true);
    function test() {
        setValue(false);
    }
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} value={value} onInput={e => test()} placeholder={placeholder} required={required}/>
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
