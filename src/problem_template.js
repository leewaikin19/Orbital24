/* eslint-disable */
import { useState, useId, createRef } from 'react'
import * as template from "./template.js"

export function MainContent({title, description, sandbox, hints, impt_note, solution}) { 
    return (
        <div className='problems'>
            <>
                <h1>{title}</h1>
            </>
            <div className='description'>
                <p>{description}</p>
            </div>
            {sandbox}
            {impt_note.map((note) => {
                return(
                    <impt_note note={note} />
                )
            })}
            {hints.map((hint, index) => {
                return(
                    <Hints title={"Hint " + index} desc={hint.hints} />
                )
            })}
            <h2>Submission</h2>
            {solution}
            {/* TODOM @LWK19 < problems.Forum  /> */}
        </div>
    )
}

export function impt_note({note}) {
    return(
        <div className="impt_note">
            <div className='impt_note_title'>
                Important Note!
                <div className='content'>
                {note}
                </div>
            </div>
        </div>
    )
}
// Code adapted from https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react 
export function Hints({title, desc}) {
    const chevronRef= createRef();
    const contentRef = createRef();
    const [showHint, setShowHint] = useState(false);
    function Reveal() {
        setShowHint((showHint) => !showHint)
    }
    function Hover() {
        chevronRef.current.style.transform = "rotate(90deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    function Unhover() {
        showHint ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    return(
        <div className="hint">
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title unselectable' style={{cursor:"default"}}>
                <a>{title} {" "}</a> <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                {(showHint) ? (
                <div className='content' ref={contentRef}>
                    {desc}
                </div>) : null}
            </div>
        </div>
    )
}

export function Srq({question, placeholder = "Enter your answer here"}) {
    const [solution, setSolution] = useState("");
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <p>{question}</p> <br/>
            <template.FormInput name='solution' value={solution} setValue={setSolution} placeholder={placeholder} required/>
        </div>
    )
}

export function Mcq({question, options}) {
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                <p>{question}</p> <br/>
                <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                    {options.filter(option => option!= '').map((option) => {
                        return(
                            <template.MCQInput id={option} name={option} value={option} onClick={() => template.select(document.getElementById(option), document.getElementById("mcq"))}/>
                        )
                    })}
            </div>
        </div>
    )
}

export function Forum({comments}) {
    const chevronRef= createRef();
    const contentRef = createRef();
    const [showHint, setShowHint] = useState(false);
    function Reveal() {
        setShowHint((showHint) => !showHint)
    }
    function Hover() {
        chevronRef.current.style.transform = "rotate(90deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    function Unhover() {
        showHint ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    return(
        <div className="hint">
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title unselectable' style={{cursor:"default"}}>
                Discussion <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
            </div>
            {(showHint) ? (
                <div className='content' ref={contentRef}>
                    {comments.map((comment) => {
                        return(
                            <div className='comment'>
                                <div className='comment_content'>
                                    {comment.content}
                                </div>
                            </div>
                        )
                    })}
                </div>) : null}
        </div>
    )
}

export function Simulation({sim}) {
    return(
        <div className='simulation'>
            <div className='simulation_title'>
                <h2>Sandbox</h2>
            </div>
            {sim}
        </div>
    )
}