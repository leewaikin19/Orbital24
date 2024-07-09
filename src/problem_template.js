/* eslint-disable */
import { useState, useId, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export function MainContent({id, title, description, sandbox = "", hints, mcqs, srqs}) { 
    return (
        <div className='problems'>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <h1 style={{flexGrow:7}}>{title}</h1>
                {/* TODO @LWK19 Am I doing the routing right? */}
                <button className="action_button animated_button" onClick={() => window.location.href = "/submissions/" + id} style={{width:"auto", padding:"0.3em 1em"}}><span>View Submissions</span></button>
            </div>
            <p>{description}</p>
            {sandbox}
            {hints.map((hint, index) => {
                return(
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{marginBottom:"0.3em"}}>Submission</h2>
            {mcqs.map((mcq, i) => {
                return(
                    <Mcq index = {i + 1} question={mcq.qn} options={mcq.options} />
                )
            })}
            {srqs.map((srq, i) => {
                return(
                    <Srq index = {i + 1} question={srq.qn} placeholder="Enter your answer here" />
                )
            })}
            {/* TODO @LWK19 submitProblem causes cyclic object value error. Idk what it means */}
            <button className="action_button animated_button" onClick={() => API.submitProblem(template.getCookie('token'), id, solution).then((resp) => resp.success ? alert(resp.reply.correct) : alert(resp.msg))}><span>Submit Solution</span></button> 
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
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title' style={{cursor:"default"}}>
                <b>{title}</b> <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                {(showHint) ? (
                <div className='content' ref={contentRef}>
                    {desc}
                </div>) : null}
            </div>
        </div>
    )
}

export function Srq({index, question, placeholder = "Enter your answer here"}) {
    const [solution, setSolution] = useState("");
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Short Response Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <template.FormInput name='solution' value={solution} setValue={setSolution} placeholder={placeholder} required/>
        </div>
    )
}

export function Mcq({index, question, options}) {
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Multiple Choice Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                    {options.filter(option => option!= '').map((option) => {
                        return(
                            <template.MCQInput id={option} name={option} value={option} content={<span>{option}</span>} onClick={() => template.select(document.getElementById(option), document.getElementById("mcq"))}/>
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