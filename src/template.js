export function form_input(type, name, id, placeholder, required) {
    return (
        <div className="form_input">
            <input type={type} name={name} id={id} placeholder={placeholder} required={required}/>
        </div>
    )
}

export function side_bar() {
    return (
        <div className="side_bar"></div>
    )
}
