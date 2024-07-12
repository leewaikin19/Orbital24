// This is the page for users to grade one of their submissions

/* eslint-disable */
import { useState, useId, useRef, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export default function Submission() {
    const [loading, setLoading] = useState(true);
    const submission = useRef({
        'id': '',
        'username': '',
        'questionID': '',
        'submission': '',
        'done': false,
        'correct': false,
        'datetime': ''
    });
    const problem = useRef({
        'title': '',
        'statement': '',
        'sandbox': '',
        'hints': [],
        'mcqs': [],
        'srqs': []
    });
    const solution = useRef(null);
    const id = window.location.href.split('/').at(-1);

    const promise = API.getGradableSubmission(template.getCookie('token'), id).then(async (resp) => {
        if (resp.success === false) {
            window.location.href = '/home'
        }
        submission.current = resp.reply;

        const promise1 = API.getProblem(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            problem.current = resp2.reply;
            setLoading(false);
        })

        const promise2 = API.getProblemSolution(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            solution.current = resp2.reply;
            setLoading(false);
        })
        await Promise.all([promise1, promise2])
    })

    return (
        < template.Home MainContent={() => (
            <MainContent submission={submission.current} problem={problem.current} solution={solution.current}/>)}  SSelected={'grade'} promise={promise} />
    )
}

function MainContent({submission, problem}) { 
    const mcqUserAnswer = submission.submission.mcqs;
    const srqUserAnswer = submission.submission.srqs;
    return (
        <>
            <em style={{marginBottom:'1em'}}>(Submitted on {new Date(submission.datetime).toLocaleString()})</em>
            <h1>{problem.title}</h1>
            <p>{problem.statement}</p>
            {problem.hints.map((hint, index) => {
                return(
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{marginBottom:"0.3em"}}>Submission</h2>
            {problem.mcqs.map((mcq, i) => {
                return(
                    <Mcq index = {i + 1} question={mcq.qn} options={mcq.options} iUserAnswer = {mcqUserAnswer[i]} iCorrectAnswer = {mcq.an}/>
                )
            })}
            {problem.srqs.map((srq, i) => {
                return(
                    <Srq index = {i + 1} question={srq.qn} placeholder="Enter your answer here" iUserAnswer = {srqUserAnswer[i]}  iCorrectAnswer = {srq.an}/>
                )
            })}
             <button className="action_button animated_button" onClick={() => API.gradeSubmission(template.getCookie('token'), id, /* TODO */)}><span>Submit Grades</span></button> 
        </>
    )
}

function impt_note({note}) {
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
function Hints({title, desc}) {
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

function Srq({index, question, placeholder = "Enter your answer here", iUserAnswer = "", iCorrectAnswer = ""}) {
    const [solution, setSolution] = useState(iUserAnswer);
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Short Response Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <template.FormInput name='solution' value={solution} onChange={e => setSolution(e.target.value)} placeholder={placeholder} required disabled = {true}/>
            <p>Correct Answer: {iCorrectAnswer}</p>
            {/* TODOM Submit Grade */}
        </div>
    )
}

function Mcq({index, question, options, iUserAnswer = "", iCorrectAnswer = ""}) {
    return(
        <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
            <b>Multiple Choice Question {index}</b> 
            <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
            <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                {options.filter(option => option!= '').map((option) => {
                    return(
                        <template.GradeMCQInput id={option} name={option} value={option} content={<span>{option + (iCorrectAnswer == option ? " (Correct Answer) " : "") + (iUserAnswer == option ? " (User Answer) " : "")}</span>} userAnswer={iUserAnswer == option} correctAnswer={iCorrectAnswer == option}/>
                    )
                })}
            </div>
        </div>
    )
}