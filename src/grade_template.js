// This is the page for users to view one of their submissions
// TODO @LWK19: Idk how to fetch and display submissions

/* eslint-disable */
import { useState, useId, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export function MainContent({id, title, description, sandbox, hints, mcqsQuestions, srqsQuestions, mcqUserAnswer, srqUserAnswer}) { 
    return (
        <div className='submission'>
            <h1>{title}</h1>
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
                    <Mcq index = {i + 1} question={mcq.qn} options={mcq.options} iUserAnswer = {mcqUserAnswer[i]} iCorrectAnswer = {mcq.an}/>
                )
            })}
            {srqs.map((srq, i) => {
                return(
                    <Srq index = {i + 1} question={srq.qn} placeholder="Enter your answer here" iUserAnswer = {srqUserAnswer[i]}  iCorrectAnswer = {srq.an}/>
                )
            })}
             <button className="action_button animated_button" onClick={() => API.gradeSubmission(template.getCookie('token'), id, /* TODO */)}><span>Submit Grades</span></button> 
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

export function Srq({index, question, placeholder = "Enter your answer here", iUserAnswer = "", iCorrectAnswer = ""}) {
    const [solution, setSolution] = useState(iUserAnswer);
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Short Response Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <template.FormInput name='solution' value={solution} setValue={setSolution} placeholder={placeholder} required disabled = {true}/>
            <p>Correct Answer: {iCorrectAnswer}</p>
            {/* TODOM @LWK19 - Will it be Correct/Wrong or will we allow marks? */}
        </div>
    )
}

export function Mcq({index, question, options, iUserAnswer = "", iCorrectAnswer = ""}) {
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Multiple Choice Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                {options.filter(option => option!= '').map((option) => {
                    return(
                        <template.GradeMCQInput id={option} name={option} value={option} content={<span>{option + (iCorrectAnswer === option ? " (Correct Answer)" : "")}</span>} userAnswer={iUserAnswer === option} correctAnswer={iCorrectAnswer === option}/>
                    )
                })}
            </div>
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