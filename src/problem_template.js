/* eslint-disable */
import { useState, useId, createRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export function MainContent({title, description, sandbox, hints, solution}) { 
    function arrayiser() {
        var arr = [];
        for(let i = 0; i < hints.length; i++) {
            arr.push({"index": i + 1, "hints": hints[i]});
        }
        return arr;
    }
    return (
        <div className='problems'>
            <>
                <h1>{title}</h1>
            </>
            <div className='description'>
                <p>{description}</p>
            </div>
            {sandbox}
            {arrayiser().map((hint) => {
                return(
                    <Hints title={"Hint " + hint.index} desc={hint.hints} />
                )
            })}
            <h2>Solution</h2>
            {solution}
            {/* < problems.Forum  /> */}
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